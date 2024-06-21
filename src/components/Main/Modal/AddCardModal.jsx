import React, { useState } from "react";
import Card from "../Card";
import { usePodcastList } from "../../../contexts/PodcastListContext";
import { searchShows } from "../../../api/spotify";

const AddCardModal = ({ isOpen, onConfirm, onClose }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnyCardClicked, setIsAnyCardClicked] = useState(false);

  const {
    selectedChannel,
    setSelectedChannel,
    categoryContent,
    activeList,
    handleConfirmAddCardModal,

    // addShowToCategory,
    // addChannelToCategoryContent,
    // handleCloseAddCardModal,
  } = usePodcastList();
  console.log("selectedChannel:", selectedChannel);

  const handleSearch = async (event) => {
    const value = event.target.value;
    console.log(value);
    setSearchInput(value);
    if (value) {
      setIsLoading(true);
      try {
        const response = await searchShows(value);
        console.log(response);
        setSearchResult(response);
      } catch (error) {
        console.error("搜尋失敗:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResult([]);
    }
  };

  const handleChannelClick = (channel) => {
    // 重複:傳入的id 已存在selectedChannel
    console.log(channel.id);
    const isSelected = selectedChannel.some((item) => item.id === channel.id);
    let updatedChannel = [...selectedChannel];
    //重複則 篩選出 除了傳入的podcast以外的項目
    if (isSelected) {
      updatedChannel = selectedChannel.filter((item) => item.id !== channel.id);
    } else {
      // 沒重複則 該項目更新isSelected
      updatedChannel = [...selectedChannel, { ...channel, active: true }];
    }
    setSelectedChannel(updatedChannel);
    setIsAnyCardClicked(!isSelected || updatedChannel.length > 0);
  };

  const currentCategory = categoryContent[activeList];
  const categoryId = currentCategory && currentCategory.id;
  const selectedShowIds = selectedChannel.map((show) => show.id);
  // console.log("selectedChannel ID:", selectedShowIds);

  const handleOnConfirm = () => {
    handleConfirmAddCardModal(categoryId, selectedChannel);
    setSearchInput("");
    setSelectedChannel([]);
  };

  // const handleOnConfirm = async () => {
  //   if (selectedChannel.length > 0) {
  //     try {
  //       // 並行發送所有添加請求
  //       await Promise.all(
  //         selectedChannel.map((show) => addShowToCategory(categoryId, show.id))
  //       );

  //       // 更新 categoryContent
  //       addChannelToCategoryContent(categoryId, selectedChannel);

  //       // 重置狀態
  //       setSearchInput("");
  //       setSelectedChannel([]);

  //       // 關閉模態框
  //       onClose();
  //     } catch (error) {
  //       console.error("Error adding shows to category:", error);
  //     }
  //   }
  // };

  const handleOnClose = () => {
    setSearchInput(""); // 重置搜索輸入
    setSelectedChannel([]); // 重置選擇的頻道
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleOnClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-wrapper">
              <div className="modal-header">
                <p className="modal-header-text">新增 Podcast</p>
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
              <div className="modal-main">
                <div className="modal-search-container">
                  <svg
                    className="search-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_37_3552)">
                      <path
                        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                        fill="#ACADB9"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_37_3552">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="開始搜尋..."
                    value={searchInput}
                    onChange={handleSearch}
                  />
                </div>
                <div className="search-result">
                  <p className="search-result-header">搜尋結果</p>
                  <div className="card-list-container">
                    {isLoading ? (
                      <p>載入中...</p>
                    ) : (
                      searchResult.map((channel) => (
                        <Card
                          key={channel.id}
                          title={channel.name}
                          publisher={channel.publisher}
                          imageUrl={channel.images[0].url}
                          onClick={() => handleChannelClick(channel)}
                          active={selectedChannel.some(
                            (item) => item.id === channel.id
                          )}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="modal-button-close" onClick={handleOnClose}>
                  <p>取消</p>
                </button>
                <button
                  className={
                    !isAnyCardClicked
                      ? "modal-button-add"
                      : "modal-button-add usable"
                  }
                  disabled={!isAnyCardClicked}
                  onClick={() => handleOnConfirm(categoryId, selectedShowIds)}
                >
                  <p>確認新增</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCardModal;
