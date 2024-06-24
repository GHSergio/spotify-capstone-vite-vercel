import React, { useState, useEffect } from "react";
import "../../styles/main.scss";
import Card from "./Card";
import AddCardModal from "./Modal/AddCardModal";
import ListItem from "./ListItem";
import { usePodcastList } from "../../contexts/PodcastListContext";
import { getShowWithEpisodes, getShowEpisodes } from "../../api/spotify";
import EmptyFolder from "../../assets/EmptyFolder.svg";
const CardList = ({
  showModal,
  handleOpenModal,
  handleCloseModal,
  // handleConfirmModal,
}) => {
  const {
    activeList,
    categoryContent,
    channelList,
    favoriteList,
    activeEpisode,
    handleClickListItem,
    handleClickPlayer,
    activeEpisodeId,
    addChannelToCategoryContent,
  } = usePodcastList();

  const [showResults, setShowResults] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const activeCategoryContent = categoryContent && categoryContent[activeList];

  // console.log("activeEpisodeId:", activeEpisodeId);

  //取得 data 傳遞給 card 渲染
  // console.log("activeCategoryContent saveShows:", activeCategoryContent);
  // console.log("favoriteList:", favoriteList);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        // 確保 activeCategoryContent 存在 & saveShows 是 Array
        if (
          !activeCategoryContent ||
          !Array.isArray(activeCategoryContent.savedShows)
        ) {
          console.log("activeCategoryContent.savedShows is not an array");
          return;
        }

        // 使用 map 遍歷 savedShows
        const promises = activeCategoryContent.savedShows.map((show) =>
          getShowWithEpisodes(show.id)
        );

        // 使用 Promise.all 確保所有的 getShowWithEpisodes 調用都完成
        const results = await Promise.all(promises);

        // 更新 showResults
        setShowResults(results);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchShows();
  }, [activeCategoryContent]);

  useEffect(() => {
    const fetchFavoriteEpisodes = async () => {
      try {
        // 确保 favoriteList 存在 & 是 Array
        if (!favoriteList || !Array.isArray(favoriteList)) {
          console.warn("favoriteList is not an array");
          return;
        }

        // 使用 map 遍歷 favoriteList
        const promises =
          favoriteList && favoriteList.map((item) => getShowEpisodes(item.id));

        // 使用 Promise.all 确保所有的 getShowEpisodes 调用都完成
        const results = await Promise.all(promises);

        // 扁平化處理 favoriteEpisodes 以獲取所有 episode
        setFavoriteEpisodes(results.flat());
      } catch (error) {
        console.error("Error fetching favorite episodes:", error);
      }
    };

    fetchFavoriteEpisodes();
  }, [favoriteList]);

  //分類清單
  const getCategoryContent = () => {
    //當List沒有內容
    if (
      !activeCategoryContent ||
      !activeCategoryContent.savedShows ||
      activeCategoryContent.savedShows.length === 0
    ) {
      return (
        <>
          <div className="default">
            <img src={EmptyFolder} alt="EmptyFolder" />
            <span>您尚未加入任何 Podcast，可以點擊按鈕新增！</span>
            <button className="button-add" onClick={handleOpenModal}>
              <p>新增 Podcast</p>
            </button>

            <AddCardModal isOpen={showModal} onClose={handleCloseModal} />
          </div>
        </>
      );
    } else {
      //當List有內容
      return (
        <>
          <div className="card-list-container">
            {showResults.length > 0 &&
              showResults &&
              showResults.map((item, index) => (
                <Card
                  key={index}
                  id={item.id}
                  title={item.name}
                  publisher={item.publisher}
                  imageUrl={item.images[0].url}
                  description={item.description}
                  episodes={item.episodes}
                />
              ))}

            <AddCardModal isOpen={showModal} onClose={handleCloseModal} />
          </div>
        </>
      );
    }
  };
  //我的最愛
  const getFavoriteContent = () => {
    if (!favoriteList || favoriteList.length === 0) {
      return (
        <>
          <div className="default">
            <img src={EmptyFolder} alt="EmptyFolder" />
            <span>您尚未收藏任何 Podcast</span>
          </div>
        </>
      );
    } else {
      //當List有內容
      return (
        <>
          <div className="favorite-list-container">
            {favoriteEpisodes &&
              favoriteEpisodes.map((episode, index) => (
                <ListItem
                  key={index}
                  item={episode}
                  handleClickListItem={() => handleClickListItem(episode.id)}
                  handleClickPlayer={() => handleClickPlayer(episode)}
                />
              ))}
          </div>
        </>
      );
    }
  };

  //Greeting
  const now = new Date();
  const getGreeting = () => {
    const hours = now.getHours();

    if (hours >= 5 && hours <= 12) {
      return "早安";
    } else if (hours >= 12 && hours <= 17) {
      return "午安";
    } else if (hours >= 17 || hours <= 5) {
      return "晚安";
    }
  };
  const greeting = getGreeting();

  return (
    <>
      {/* <div className="content-wrapper"> */}
      <h1>{greeting}</h1>
      {activeList === 99 ? getFavoriteContent() : getCategoryContent()}
      {/* </div> */}
    </>
  );
};

export default CardList;
