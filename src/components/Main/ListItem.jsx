import React from "react";
import { usePodcastList } from "../../contexts/PodcastListContext";
import "../../styles/main.scss";
import ReactTooltip from "react-tooltip";

const ListItem = ({ item, handleClickListItem, handleClickPlayer }) => {
  const {
    handleToggleFromBookmark,
    currentPlayer,
    convertMsToHoursAndMinutes,
    activeEpisodeId,
    isFavorite,
  } = usePodcastList();
  // 提取item內的屬性
  const { id, name, images, description, release_date, duration_ms } = item;

  const formattedVideoLength = () => {
    const { hours, minutes } = convertMsToHoursAndMinutes(duration_ms);
    return `${hours}小時${minutes}分鐘`;
  };

  // console.log("isFavorite:", isFavorite(activeEpisodeId));
  // console.log("episode ID:", item && item.id);

  // console.log("currentPlayer:", currentPlayer);
  // console.log("activeEpisodeId:", activeEpisodeId);
  return (
    <>
      <div
        className={`video-container ${
          activeEpisodeId === item.id ? "active" : ""
        }`}
        onClick={() => handleClickListItem(id)}
      >
        <div className="video-wrapper">
          <div className="video-image">
            <img src={images[0].url} alt="" />
          </div>
          <div className="video-content">
            <span className="title" data-tip={name}>
              {name}
            </span>
            <span className="description">{description}</span>
            <div className="switch-wrapper">
              <div
                className="player"
                onClick={() => handleClickPlayer(activeEpisodeId)}
              >
                {currentPlayer.id === id ? (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 0.333496C7.80004 0.333496 0.333374 7.80016 0.333374 17.0002C0.333374 26.2002 7.80004 33.6668 17 33.6668C26.2 33.6668 33.6667 26.2002 33.6667 17.0002C33.6667 7.80016 26.2 0.333496 17 0.333496ZM15.3334 23.6668H12V10.3335H15.3334V23.6668ZM22 23.6668H18.6667V10.3335H22V23.6668Z"
                      fill="#FF7F50"
                    />
                  </svg>
                ) : (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 0.333374C7.80004 0.333374 0.333374 7.80004 0.333374 17C0.333374 26.2 7.80004 33.6667 17 33.6667C26.2 33.6667 33.6667 26.2 33.6667 17C33.6667 7.80004 26.2 0.333374 17 0.333374ZM13.6667 24.5V9.50004L23.6667 17L13.6667 24.5Z"
                      fill="#FF7F50"
                    />
                  </svg>
                )}
              </div>
              <p className="date">
                {release_date} - {formattedVideoLength()}
              </p>
            </div>

            <div
              className="bookmark"
              onClick={() => handleToggleFromBookmark(item.id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_38_14)">
                  <path
                    d="M14.1667 2.5H5.83341C4.91675 2.5 4.16675 3.25 4.16675 4.16667V17.5L10.0001 15L15.8334 17.5V4.16667C15.8334 3.25 15.0834 2.5 14.1667 2.5Z"
                    fill={isFavorite(id) ? "#FF7F50" : "#FFFFFF"}
                    stroke="#FF7F50"
                    strokeWidth="1.5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_38_14">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip className="custom-tooltip" />
    </>
  );
};

export default ListItem;
