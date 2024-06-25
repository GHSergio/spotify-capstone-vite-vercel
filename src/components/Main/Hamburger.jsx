import { usePodcastList } from "../../contexts/PodcastListContext";
import ListActionModal from "./Modal/ListActionModal";

const Hamburger = ({ isActive, onClick, disabled }) => {
  const {
    listActionModal,
    handleCloseListActionModal,
    categoryContent,
    activeList,
    currentAction,
    handleActionClick,
    handleOpenAddCardModal,
  } = usePodcastList();

  const classNames = isActive
    ? "dropdown-container active"
    : "dropdown-container";

  const renderActionModal = () => {
    switch (currentAction) {
      case "edit":
        return (
          <ListActionModal
            isOpen={listActionModal}
            header="編輯分類名稱"
            confirmText="儲存"
            onClose={handleCloseListActionModal}
            placeholder="請輸入分類名稱（前方可變更 emoji）"
            index={activeList}
            currentAction={currentAction}
          />
        );

      case "add":
        return (
          <ListActionModal
            isOpen={listActionModal}
            header="新增分類"
            defaultValue={{
              emoji: " 🎵",
            }}
            placeholder="請輸入分類名稱"
            confirmText="儲存"
            onClose={handleCloseListActionModal}
            // index={activeList}
            currentAction={currentAction}
          />
        );

      case "delete":
        return (
          <ListActionModal
            isOpen={listActionModal}
            header="刪除分類"
            text={`您確定要繼續刪除
             " ${categoryContent[activeList]?.emoji}
             ${categoryContent[activeList]?.name} " 分類嗎？`}
            confirmText="刪除"
            onClose={handleCloseListActionModal}
            index={activeList}
            currentAction={currentAction}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="hamburger-wrapper" onClick={disabled ? null : onClick}>
        <div className="hamburger-dot"></div>
        <div className="hamburger-dot"></div>
        <div className="hamburger-dot"></div>

        {
          <div className={classNames}>
            <div className="dropdown-item">
              <p onClick={() => handleActionClick?.("edit")}>編輯名稱</p>
            </div>

            <hr />

            <div className="dropdown-item">
              <p onClick={handleOpenAddCardModal}>新增Podcast</p>
            </div>
            <hr />

            <div className="dropdown-item">
              <p onClick={() => handleActionClick?.("delete")}>刪除分類</p>
            </div>
          </div>
        }
        {renderActionModal()}
      </div>
    </>
  );
};

export default Hamburger;
