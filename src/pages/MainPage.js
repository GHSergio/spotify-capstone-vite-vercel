import { useEffect } from "react";
import "../styles/main.scss";
import CardList from "../components/Main/CardList";
import User from "../components/Footer/User";
import Player from "../components/Footer/Player";
import NavigationItem from "../components/Main/NavigationItem";
import { usePodcastList } from "../contexts/PodcastListContext";
import { AddIcon } from "../components/FontAwesome/FontAwesome";
// import { useUser } from "../contexts/UserContext";

const Main = () => {
  // const { setUserData } = useUser();

  const {
    categoryContent,
    setCategoryContent,
    favoriteList,
    setFavoriteList,
    activeList,

    handleNavigationItem,

    activeDropdown,
    handleClickDropdown,

    handleActionClick,
    addCardModal,

    handleOpenAddCardModal,
    handleCloseAddCardModal,
    // handleConfirmAddCardModal,
    setCategoryEmoji,
    setChannelList,

    // handleGetShowEpisodes,
  } = usePodcastList();

  const categoryList = categoryContent && Object.values(categoryContent);

  //初始獲取各項localStorage set 進 state
  //由於只有一開始會從伺服器獲取資訊,從callback切到main都要從localStorage拿
  useEffect(() => {
    const userFavoriteList = JSON.parse(
      localStorage.getItem("userFavoriteList")
    );
    const userCategoryContent = JSON.parse(
      localStorage.getItem("userCategoryContent")
    );
    const categoryEmojiData = JSON.parse(
      localStorage.getItem("categoryEmojiData")
    );

    console.log("userFavoriteList:", userFavoriteList);
    console.log("userCategoryContent:", userCategoryContent);
    console.log("categoryEmojiData:", categoryEmojiData);

    // setUserData(userProfileData); //使用者資訊
    setFavoriteList(userFavoriteList); //使用者收藏
    setCategoryEmoji(categoryEmojiData); //映射表情
    setCategoryContent(userCategoryContent); //映射後的分類清單
  }, [
    // setUserData,
    setFavoriteList,
    setChannelList,
    setCategoryEmoji,
    setCategoryContent,
  ]);

  // console.log("Main 接收到的 收藏清單:", favoriteList);
  // console.log("Main 接收到的 頻道清單:", channelList);
  // console.log("Main 接收到的 categoryContent:", categoryContent);
  // console.log("Main 接收到的 分類清單映射表情:", categoryEmoji);

  return (
    <div className="main-container">
      <nav className="navigation">
        <div className="logo-container">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5298 0.968413C7.8593 0.388296 8.68306 0.388296 9.01257 0.968413L16.4264 14.021C16.7559 14.6012 16.344 15.3263 15.685 15.3263H0.857352C0.198345 15.3263 -0.213534 14.6012 0.11597 14.021L7.5298 0.968413Z"
              fill="#30A9DE"
            />
          </svg>
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.076355 1.59999C0.076355 1.01089 0.54618 0.533325 1.12574 0.533325H13.5803C14.1598 0.533325 14.6296 1.01089 14.6296 1.59999V14.2596C14.6296 14.8487 14.1598 15.3263 13.5803 15.3263H1.12574C0.54618 15.3263 0.076355 14.8487 0.076355 14.2596V1.59999Z"
              fill="#FF7F50"
            />
          </svg>
          <svg
            width="130"
            height="16"
            viewBox="0 0 130 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.820984 15.4667L7.43209 0.53334H10.1185L16.7506 15.4667H13.8963L8.20864 2.00534H9.3L3.63333 15.4667H0.820984ZM3.86419 12.0107L4.59876 9.83467H12.5321L13.2667 12.0107H3.86419Z"
              fill="#111111"
            />
            <path
              d="M18.619 15.4667V0.53334H21.3474V13.12H29.0289V15.4667H18.619Z"
              fill="#111111"
            />
            <path
              d="M31.1829 15.4667V0.53334H37.2273C38.5286 0.53334 39.6409 0.746674 40.5644 1.17334C41.5018 1.60001 42.2224 2.21156 42.7261 3.00801C43.2298 3.80445 43.4817 4.75023 43.4817 5.84534C43.4817 6.94045 43.2298 7.88623 42.7261 8.68267C42.2224 9.47912 41.5018 10.0907 40.5644 10.5173C39.6409 10.944 38.5286 11.1573 37.2273 11.1573H32.694L33.9113 9.85601V15.4667H31.1829ZM33.9113 10.1547L32.694 8.81067H37.1014C38.3047 8.81067 39.2072 8.55467 39.8088 8.04267C40.4245 7.51645 40.7323 6.78401 40.7323 5.84534C40.7323 4.89245 40.4245 4.16001 39.8088 3.64801C39.2072 3.13601 38.3047 2.88001 37.1014 2.88001H32.694L33.9113 1.51467V10.1547Z"
              fill="#111111"
            />
            <path
              d="M56.5322 0.53334H59.2606V15.4667H56.5322V0.53334ZM48.9347 15.4667H46.2063V0.53334H48.9347V15.4667ZM56.7421 9.06667H48.7038V6.69867H56.7421V9.06667Z"
              fill="#111111"
            />
            <path
              d="M61.1195 15.4667L67.7306 0.53334H70.417L77.0491 15.4667H74.1948L68.5071 2.00534H69.5985L63.9318 15.4667H61.1195ZM64.1627 12.0107L64.8973 9.83467H72.8306L73.5652 12.0107H64.1627Z"
              fill="#111111"
            />
            <path
              d="M91.5178 15.68C90.3985 15.68 89.3561 15.4951 88.3907 15.1253C87.4392 14.7413 86.6067 14.208 85.8931 13.5253C85.1935 12.8285 84.6479 12.0107 84.2561 11.072C83.8643 10.1333 83.6684 9.10934 83.6684 8.00001C83.6684 6.89067 83.8643 5.86667 84.2561 4.92801C84.6479 3.98934 85.2005 3.17867 85.9141 2.49601C86.6277 1.79912 87.4602 1.26579 88.4116 0.896007C89.3631 0.512007 90.4055 0.320007 91.5388 0.320007C92.7421 0.320007 93.8405 0.533341 94.8339 0.960008C95.8273 1.37245 96.6668 1.99112 97.3524 2.81601L95.5894 4.50134C95.0577 3.91823 94.4631 3.48445 93.8055 3.20001C93.1479 2.90134 92.4343 2.75201 91.6647 2.75201C90.8952 2.75201 90.1886 2.88001 89.545 3.13601C88.9154 3.39201 88.3627 3.75467 87.887 4.22401C87.4252 4.69334 87.0614 5.24801 86.7956 5.88801C86.5437 6.52801 86.4178 7.23201 86.4178 8.00001C86.4178 8.76801 86.5437 9.47201 86.7956 10.112C87.0614 10.752 87.4252 11.3067 87.887 11.776C88.3627 12.2453 88.9154 12.608 89.545 12.864C90.1886 13.12 90.8952 13.248 91.6647 13.248C92.4343 13.248 93.1479 13.1058 93.8055 12.8213C94.4631 12.5227 95.0577 12.0747 95.5894 11.4773L97.3524 13.184C96.6668 13.9947 95.8273 14.6133 94.8339 15.04C93.8405 15.4667 92.7351 15.68 91.5178 15.68Z"
              fill="#111111"
            />
            <path
              d="M106.517 15.4667V13.1627L106.37 12.672V8.64001C106.37 7.85778 106.139 7.25334 105.678 6.82667C105.216 6.38579 104.516 6.16534 103.579 6.16534C102.949 6.16534 102.327 6.2649 101.711 6.46401C101.109 6.66312 100.599 6.94045 100.179 7.29601L99.1506 5.35467C99.7522 4.88534 100.466 4.5369 101.291 4.30934C102.131 4.06756 102.998 3.94667 103.894 3.94667C105.517 3.94667 106.769 4.3449 107.651 5.14134C108.546 5.92356 108.994 7.13956 108.994 8.78934V15.4667H106.517ZM102.991 15.616C102.152 15.616 101.417 15.4738 100.788 15.1893C100.158 14.8907 99.6683 14.4853 99.3185 13.9733C98.9827 13.4471 98.8148 12.8569 98.8148 12.2027C98.8148 11.5627 98.9617 10.9867 99.2555 10.4747C99.5634 9.96267 100.06 9.55734 100.746 9.25867C101.431 8.96001 102.341 8.81067 103.474 8.81067H106.727V10.5813H103.663C102.767 10.5813 102.166 10.7307 101.858 11.0293C101.55 11.3138 101.396 11.6693 101.396 12.096C101.396 12.5796 101.585 12.9636 101.963 13.248C102.341 13.5325 102.865 13.6747 103.537 13.6747C104.181 13.6747 104.754 13.5253 105.258 13.2267C105.776 12.928 106.146 12.4871 106.37 11.904L106.811 13.504C106.559 14.1725 106.105 14.6916 105.447 15.0613C104.803 15.4311 103.985 15.616 102.991 15.616Z"
              fill="#111111"
            />
            <path
              d="M115.824 15.616C114.886 15.616 113.984 15.4951 113.116 15.2533C112.263 14.9973 111.584 14.6916 111.08 14.336L112.088 12.3093C112.592 12.6365 113.193 12.9067 113.893 13.12C114.592 13.3333 115.292 13.44 115.992 13.44C116.817 13.44 117.412 13.3262 117.776 13.0987C118.153 12.8711 118.342 12.5653 118.342 12.1813C118.342 11.8685 118.216 11.6338 117.964 11.4773C117.713 11.3067 117.384 11.1787 116.978 11.0933C116.572 11.008 116.117 10.9298 115.614 10.8587C115.124 10.7876 114.627 10.6951 114.124 10.5813C113.634 10.4533 113.186 10.2756 112.78 10.048C112.375 9.80623 112.046 9.48623 111.794 9.08801C111.542 8.68979 111.416 8.16356 111.416 7.50934C111.416 6.78401 111.619 6.15823 112.025 5.63201C112.431 5.09156 112.997 4.67912 113.725 4.39467C114.466 4.09601 115.341 3.94667 116.348 3.94667C117.104 3.94667 117.866 4.03201 118.636 4.20268C119.406 4.37334 120.042 4.61512 120.546 4.92801L119.538 6.95467C119.007 6.62756 118.468 6.40712 117.922 6.29334C117.391 6.16534 116.859 6.10134 116.327 6.10134C115.53 6.10134 114.935 6.22223 114.543 6.46401C114.166 6.70578 113.977 7.01156 113.977 7.38134C113.977 7.72267 114.103 7.97867 114.355 8.14934C114.606 8.32001 114.935 8.45512 115.341 8.55468C115.747 8.65423 116.194 8.73956 116.684 8.81067C117.188 8.86756 117.685 8.96001 118.174 9.08801C118.664 9.21601 119.112 9.39378 119.517 9.62134C119.937 9.83467 120.273 10.1405 120.525 10.5387C120.777 10.9369 120.903 11.456 120.903 12.096C120.903 12.8071 120.693 13.4258 120.273 13.952C119.867 14.4782 119.287 14.8907 118.531 15.1893C117.775 15.4738 116.873 15.616 115.824 15.616Z"
              fill="#111111"
            />
            <path
              d="M127.38 15.616C126.149 15.616 125.198 15.296 124.526 14.656C123.855 14.0018 123.519 13.0418 123.519 11.776V1.55734H126.142V11.712C126.142 12.2525 126.275 12.672 126.541 12.9707C126.821 13.2693 127.206 13.4187 127.695 13.4187C128.283 13.4187 128.773 13.2622 129.164 12.9493L129.899 14.848C129.591 15.104 129.213 15.296 128.766 15.424C128.318 15.552 127.856 15.616 127.38 15.616ZM121.672 6.29334V4.16001H129.143V6.29334H121.672Z"
              fill="#111111"
            />
          </svg>
          <hr />
        </div>
        <ul className="list-container">
          {categoryList &&
            categoryList.map((category, index) => {
              return (
                <>
                  <NavigationItem
                    index={index}
                    key={category?.id}
                    emoji={category?.emoji}
                    title={category?.name}
                    handleNavigationItem={handleNavigationItem}
                    activeDropdown={activeDropdown === index}
                    handleDropdownClick={() => handleClickDropdown(index)}
                  />
                </>
              );
            })}

          <NavigationItem
            index={99}
            title="收藏清單"
            emoji="❤️"
            handleNavigationItem={() => handleNavigationItem(99)}
          />

          {/* addCategory */}
          <li
            className="list-item addCategory"
            onClick={() => handleActionClick("add")}
          >
            <div className="list-item-content">
              <AddIcon />
              <p className="list-item-title">新增分類</p>
            </div>
          </li>
        </ul>
      </nav>
      <div className="content-container">
        <CardList
          showModal={addCardModal}
          handleOpenModal={handleOpenAddCardModal}
          handleCloseModal={handleCloseAddCardModal}
          // handleConfirmModal={handleConfirmAddCardModal}
        />
      </div>
      <div className="footer">
        <User />
        <Player />
      </div>
    </div>
  );
};

export default Main;
