import React, { createContext, useState, useContext } from "react";
import { GetFavoriteIds, PostFavorite, RemoveFavorite } from "../api/acRequest";
import {
  addFavoriteSuccess,
  removeFavoriteSuccess,
  addFavoriteFail,
  addFavoriteError,
  removeFavoriteFail,
  removeFavoriteError,
} from "../components/Swal";
import { addShowToCategory } from "../api/acRequest";

const PodcastListContext = createContext();
export const usePodcastList = () => useContext(PodcastListContext);

const PodcastListProvider = ({ children }) => {
  const [channelList, setChannelList] = useState([]);
  const [categoryContent, setCategoryContent] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const [activeList, setActiveList] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [showMoreModal, setShowMoreModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [addCardModal, setAddCardModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState([]);
  const [listActionModal, setListActionModal] = useState(false);

  const [currentAction, setCurrentAction] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const [activeEpisodeId, setActiveEpisodeId] = useState(null);

  const [currentPlayer, setCurrentPlayer] = useState({
    date: "2024-04-23",
    description:
      "✨好味聽眾專屬的優惠✨ 長輩最愛，回購率超高👉 https://fun-s.cc/好味小姐專屬優惠 母親節快來寵愛自己的媽咪🎉芳茲滴雞精回饋聽眾朋友 4/22-5/12滿額好禮有機會抽萬元好禮！ 平常媽媽總是在家忙進忙出 時常忙到沒有運動時間 趁著這次返鄉過母親節 送上一份能增加代謝的健康補給品 #日月養生薑黃滴雞精 ✅熟齡族最愛，滋補保養聖品 ✅三色薑黃素，促進新陳代謝 ✅總支鏈胺基酸，為你提振精神 距離母親節大概還有四週的時間 ✨為最愛的媽媽，補好雙效營養✨4/22-5/12芳茲母親節優惠活動 👉🏻滿 3,800 送 三風製麵 見面幸福麵線 1 包(200 公克/2 人份) 👉🏻滿 8,800 抽 日本製虎牌 多功能電子鍋 (價值$20,000) 👉🏻滿 15,888 送 NHB游離型金盞花葉黃素 1 瓶 (價值$1,580) #芳茲生技#芳茲薑黃滴雞精 #芳茲雞魚饗宴 -- Hosting provided by SoundOn",
    id: "2l2rRYeI9vuvvIFtzhzoQ0",
    imgSrc: "https://i.scdn.co/image/f40fdfa8f4162cf5cceba34373e0d52c36524b0e",
    name: "EP207 入魔眼藥水與社恐校友與可悲夜市",
    videoLength: 3837983,
  });
  //要映射的emoji
  const [categoryEmoji, setCategoryEmoji] = useState({});
  // console.log("currentAction:", currentAction);
  // console.log("listActionModal:", listActionModal);
  // console.log("categoryContent:", categoryContent);
  //轉換時長單位
  const convertMsToHoursAndMinutes = (milliseconds) => {
    // 將毫秒數轉換為秒數
    const seconds = Math.floor(milliseconds / 1000);
    // 將秒數轉換為分鐘數
    const minutes = Math.floor(seconds / 60);
    // 計算剩餘的秒數
    const remainingSeconds = seconds % 60;
    // 將分鐘數轉換為小時數
    const hours = Math.floor(minutes / 60);
    // 計算剩餘的分鐘數
    const remainingMinutes = minutes % 60;

    return { hours, minutes: remainingMinutes, seconds: remainingSeconds };
  };

  //將 episodeId set activeEpisode
  const handleClickListItem = (episodeId) => {
    // console.log("active episodeId:", episodeId);
    setActiveEpisodeId(activeEpisodeId === episodeId ? null : episodeId);
  };

  //在 channelList 中查找id匹配的 episode
  const handleClickPlayer = (item) => {
    // console.log(item);
    setCurrentPlayer(item);
    // console.log("currentPlayer:", currentPlayer);
  };

  const handleSelectedChannelClick = (podcast) => {
    setSelectedChannel(podcast.id);
  };

  //設置當前NavigationItem
  const handleNavigationItem = (index) => {
    setActiveList(index);
  };

  const handleClickDropdown = (index) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === index ? null : index
    );
  };

  // // 將 show 添加到指定的分類中
  const addChannelToCategoryContent = (categoryId, selectedShows) => {
    setCategoryContent((prevCategoryContent) => {
      const updatedCategoryContent = prevCategoryContent.map((category) => {
        if (category.id === categoryId) {
          const currentSavedShows = category.savedShows || [];
          const uniqueSelectedSavedShows = selectedShows.filter((show) => {
            return !currentSavedShows.some(
              (existingShow) => existingShow.id === show.id
            );
          });
          return {
            ...category,
            savedShows: [...currentSavedShows, ...uniqueSelectedSavedShows],
          };
        }
        return category;
      });

      localStorage.setItem(
        "userCategoryContent",
        JSON.stringify(updatedCategoryContent)
      );
      return updatedCategoryContent;
    });
  };

  const handleConfirmAddCardModal = async (categoryId, selectedShows) => {
    if (selectedShows.length > 0) {
      for (let show of selectedShows) {
        const result = await addShowToCategory(categoryId, show.id);
        if (!result.success) {
          console.error(`Failed to add show ${show.id}:`, result.message);
          return; // 如果 API 請求失敗，則退出函數
        }
      }
      addChannelToCategoryContent(categoryId, selectedShows);
      setAddCardModal(false);
      setSelectedChannel([]);
    }
  };

  // addCardModal
  const handleOpenAddCardModal = () => {
    setAddCardModal(true);
  };

  const handleCloseAddCardModal = () => {
    setAddCardModal(false);
    setSelectedChannel([]);
  };

  //showMoreModal
  const handleOpenShowMoreModal = () => {
    setShowMoreModal(true);
  };

  const handleCloseShowMoreModal = () => {
    setShowMoreModal(false);
  };

  // listActionModal
  const handleOpenListActionModal = () => {
    setListActionModal(true);
  };

  const handleCloseListActionModal = () => {
    setListActionModal(false);
  };

  const handleEditInput = (event) => {
    setEditInput(event.target.value);
  };

  //設置action為setCurrentAction & openModal
  const handleActionClick = (action) => {
    setCurrentAction(action);
    handleOpenListActionModal();
    console.log("currentAction:", action); // 添加這行
    console.log("listActionModal:", true); // 添加這行
  };

  //favoriteList 相關
  //episode 是否在 favoriteList內
  const isFavorite = (episodeId) => {
    return (
      favoriteList &&
      favoriteList.length !== 0 &&
      favoriteList.some((item) => item.id === episodeId)
    );
  };

  //添加收藏
  const handleAddFavorite = async (episodeId) => {
    try {
      const result = await PostFavorite(episodeId);
      result.success ? addFavoriteSuccess() : addFavoriteFail();
    } catch (error) {
      addFavoriteError();
    }
  };
  //移除收藏
  const handleRemoveFavorite = async (episodeId) => {
    try {
      const result = await RemoveFavorite(episodeId);
      result.success ? removeFavoriteSuccess() : removeFavoriteFail();
    } catch (error) {
      removeFavoriteError();
    }
  };

  // 處理書籤：在收藏中則移除，否則新增；並獲取更新的收藏清單
  const handleToggleFromBookmark = async (episodeId) => {
    if (isFavorite(episodeId)) {
      await handleRemoveFavorite(episodeId);
    } else {
      await handleAddFavorite(episodeId);
    }
    const updatedFavorites = await GetFavoriteIds();
    setFavoriteList(updatedFavorites);
  };

  return (
    <PodcastListContext.Provider
      value={{
        channelList,
        setChannelList,

        selectedChannel,
        setSelectedChannel,
        handleSelectedChannelClick,

        categoryContent,
        setCategoryContent,

        favoriteList,
        setFavoriteList,

        activeList,
        setActiveList,
        handleNavigationItem,

        activeDropdown,
        setActiveDropdown,
        handleClickDropdown,

        listActionModal,
        handleOpenListActionModal,
        handleCloseListActionModal,

        addCardModal,
        setAddCardModal,
        handleOpenAddCardModal,
        handleCloseAddCardModal,
        handleConfirmAddCardModal,

        addChannelToCategoryContent,

        showMoreModal,
        setShowMoreModal,
        handleOpenShowMoreModal,
        handleCloseShowMoreModal,

        selectedCard,
        setSelectedCard,

        currentAction,
        handleActionClick,

        editInput,
        setEditInput,
        handleEditInput,

        // editListItem,
        // deleteNavigationItem,
        // addNavigationItem,
        isFavorite,
        handleToggleFromBookmark,

        activeEpisodeId,
        setActiveEpisodeId,
        handleClickListItem,

        currentPlayer,
        setCurrentPlayer,
        handleClickPlayer,

        // handleGetShowEpisodes,

        convertMsToHoursAndMinutes,

        chosenEmoji,
        setChosenEmoji,

        // handleInput,
        // handleEmoji,
        // handleRevise,

        categoryEmoji,
        setCategoryEmoji,

        // favoriteListEmoji,
        // setFavoriteListEmoji,
      }}
    >
      {children}
    </PodcastListContext.Provider>
  );
};

export default PodcastListProvider;
