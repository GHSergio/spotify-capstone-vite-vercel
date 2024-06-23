import { usePodcastList } from "../../../contexts/PodcastListContext";
import { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import ReactTooltip from "react-tooltip";
import {
  GetCategory,
  AddCategory,
  deleteCategory,
  putCategory,
} from "../../../api/acRequest";
import {
  editCategoryEmoji,
  addCategoryEmoji,
  deleteCategoryEmoji,
} from "../../../api/supabaseApi";
import "../../../styles/main.scss";

const ListActionModal = ({
  isOpen,
  onClose,
  header,
  text,
  confirmText,
  placeholder,
  index,
  currentAction,
}) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("");

  const {
    editInput,
    setEditInput,
    handleEditInput,
    categoryContent,
    setCategoryContent,
    categoryEmoji,
    // editListItem,
    // deleteListItem,
    // addNavigationItem,
  } = usePodcastList();

  const currentCategory = categoryContent[[index]] && categoryContent[[index]];
  const defaultTitle = currentCategory?.name;
  const defaultEmoji = currentCategory?.emoji;
  // console.log("categoryContent:", categoryContent);
  // console.log(" categoryEmoji:", categoryEmoji);
  // console.log("currentCategory:", currentCategory);
  // console.log("defaultTitle:", defaultTitle);

  // 重新初始化 ReactTooltip
  useEffect(() => {
    if (isOpen) {
      ReactTooltip.rebuild();
    }
  }, [isOpen]);

  const handleEditNavigationItem = async (index, newTitle, newEmoji) => {
    const category = categoryContent[index];
    try {
      const updateResult = await putCategory({
        categoriesId: category.id,
        name: newTitle,
      });
      if (updateResult?.success) {
        if (newEmoji && newEmoji !== category.emoji) {
          try {
            const emojiUpdateResponse = await editCategoryEmoji(
              category.id,
              newEmoji
            );
            console.log("Emoji 更新成功:", emojiUpdateResponse);
          } catch (error) {
            console.error("更新 emoji 失敗:", error);
          }
        }
        const updatedCategoryContent =
          categoryContent &&
          categoryContent.map((item, idx) => {
            if (idx === index) {
              return {
                ...item,
                name: newTitle,
                emoji: newEmoji || item.emoji,
              };
            }
            return item;
          });

        localStorage.setItem(
          "userCategoryContent",
          JSON.stringify(updatedCategoryContent)
        );

        setCategoryContent(updatedCategoryContent);
      } else {
        console.error("分類名稱更新失敗:", updateResult.message);
      }
    } catch (error) {
      console.error("更新分類名稱時發生錯誤:", error);
    }
  };

  //刪除本地清單
  const deleteLocalStateCategory = (categoryId) => {
    setCategoryContent((prevListContent) => {
      return prevListContent.filter((item) => item.id !== categoryId);
    });
  };

  //處理刪除 向後端請求刪除分類 & 更新本地
  const handleDeleteCategory = async (categoryId) => {
    try {
      //發送請求刪除category
      const deleteResult = await deleteCategory(categoryId);
      if (deleteResult?.success) {
        // 分類刪除成功後，刪除對應的 emoji
        const emojiDeleteResult = await deleteCategoryEmoji(categoryId);
        if (emojiDeleteResult.success) {
          deleteLocalStateCategory(categoryId);
        } else {
          console.error("刪除emoji失敗:", emojiDeleteResult.message);
        }
      } else {
        console.error("刪除分類失敗:", deleteResult.message);
      }
    } catch (err) {
      console.error("刪除清單 發生錯誤:", err);
    }
  };

  //請求後端新增分類 & 獲取分類
  const addCategory = async (newTitle) => {
    try {
      const addResult = await AddCategory({ newTitle });
      if (addResult?.success) {
        // 獲取最新的分類列表 & 更新localStorage
        const categories = await GetCategory();
        // 找出ID最大的分類
        const newCategory = categories.reduce((prev, current) => {
          return prev.id > current.id ? prev : current;
        });
        console.log("新的分類id:", newCategory.id);
        return newCategory; // 返回新分類，包括 ID
      } else {
        console.error("新增分類失敗:", addResult?.message);
        return null;
      }
    } catch (error) {
      console.error("新增分類清單發生錯誤:", error.message);
      return null;
    }
  };

  //添加新分類emoji
  const createCategoryEmoji = async (categoryId, emoji = "🎵") => {
    try {
      const result = await addCategoryEmoji(categoryId, emoji);
      console.log("新增表情response:", result);
      return result;
    } catch (error) {
      console.error("創建 emoji 失敗:", error);
    }
  };

  //更新至本地清單state
  const updateLocalStateWithNewCategory = (newCategory, emoji) => {
    setCategoryContent((prevListContent) => [
      ...prevListContent,
      { ...newCategory, emoji: emoji },
    ]);
  };

  //處理新增分類 預設emoji = "🎵"
  const handleAddCategory = async (title) => {
    const newCategory = await addCategory(title);
    if (newCategory) {
      await createCategoryEmoji(newCategory.id);
      updateLocalStateWithNewCategory(newCategory, "🎵");
    }
  };

  //處理confirm
  const handleConfirmAction = () => {
    switch (currentAction) {
      case "edit":
        // 執行編輯操作 變更title
        handleEditNavigationItem(index, editInput, chosenEmoji);
        setEditInput("");
        setChosenEmoji("");
        onClose();
        break;

      case "delete":
        handleDeleteCategory(currentCategory.id);
        onClose();
        break;

      case "add":
        // 執行添加操作
        handleAddCategory(editInput);
        setEditInput("");
        onClose();
        break;

      default:
        console.error("Invalid action");
    }
  };

  //開啟表情選擇器
  const handlePickerOpen = () => {
    setPickerOpen(true);
  };

  //選取emoji  setChosenEmoji
  const onEmojiClick = (event, emojiObject) => {
    // const newEmoji = emojiObject.emoji;
    const newEmoji = event.emoji;
    setChosenEmoji(newEmoji);
    setPickerOpen(false);
  };

  // console.log("ListModal 接收到的 editInput:", editInput);
  // console.log("ListModal 接收到的 defaultValue:", defaultValue);
  // console.log("chosenEmoji:", chosenEmoji);

  // 在模態框打開時重置 editInput
  useEffect(() => {
    if (isOpen && header !== "新增分類") {
      setEditInput(defaultTitle || "");
      setChosenEmoji(defaultEmoji || "");
    }
  }, [isOpen, defaultTitle, defaultEmoji, setEditInput]);

  useEffect(() => {
    if (header === "編輯分類名稱" && currentCategory) {
      setEditInput(currentCategory.name);
    } else {
      setEditInput("");
    }
  }, [header, currentCategory, setEditInput]);

  return (
    <>
      <ReactTooltip place="top" type="dark" effect="float" />
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div
            className="list-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-wrapper">
              <div className="modal-header">
                <p className="modal-header-text">{header}</p>
                <svg
                  className="button-close"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={onClose}
                >
                  <g clipPath="url(#clip0_37_3297)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="#93989A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_37_3297">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <hr />
              <div className="list-modal-main">
                {/* 刪除分類不用input */}
                {header !== "刪除分類" && (
                  <div className="list-modal-search-container">
                    {/* 拆分成emoji & title */}
                    {header === "編輯分類名稱" && (
                      <>
                        <div
                          className="emoji-container"
                          onClick={handlePickerOpen}
                          data-tip="點選可變更圖示"
                        >
                          <span className="emoji">
                            {chosenEmoji || (defaultEmoji && defaultEmoji)}
                          </span>
                        </div>
                        <span className="separator">|</span>
                      </>
                    )}
                    {header === "編輯分類名稱" ? (
                      <input
                        className="search-input"
                        type="text"
                        value={
                          editInput && editInput.length === 0
                            ? defaultTitle
                            : editInput
                        }
                        placeholder={placeholder && placeholder}
                        onChange={handleEditInput}
                        data-tip="點選左側圖示可進行變更"
                      />
                    ) : (
                      <input
                        className="search-input"
                        type="text"
                        placeholder={placeholder && placeholder}
                        value={editInput.length === 0 ? "" : editInput}
                        onChange={handleEditInput}
                        data-tip="圖示為預設,可於編輯名稱選項變更圖示"
                      />
                    )}
                  </div>
                )}

                <div className="search-result">
                  {text && <p className="search-result-header">{text}</p>}
                  <div className="card-list-container"></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="modal-button-close" onClick={onClose}>
                  <p>取消</p>
                </button>
                {/* 有input的actionModal input不能空白 */}
                {currentAction !== "delete" ? (
                  <button
                    className={
                      editInput && editInput.length !== 0
                        ? "modal-button-add usable"
                        : "modal-button-add"
                    }
                    disabled={editInput && editInput.length === 0}
                    onClick={handleConfirmAction}
                  >
                    <p>{confirmText}</p>
                  </button>
                ) : (
                  <button
                    className="modal-button-add usable"
                    onClick={handleConfirmAction}
                  >
                    <p>{confirmText}</p>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* emoji選擇器 */}
      {pickerOpen && (
        <div
          className="emoji-picker-container"
          style={{
            zIndex: "100",
            position: "absolute",
            bottom: "-200px",
            left: "-100px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </>
  );
};

export default ListActionModal;
