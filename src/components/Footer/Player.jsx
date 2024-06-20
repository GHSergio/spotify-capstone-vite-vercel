// import "../../styles/footer.scss";
import "../../styles/footer.css";
import React from "react";
import { usePodcastList } from "../../contexts/PodcastListContext.jsx";
// import { PostFavorite, RemoveFavorite } from "../../api/acRequest.jsx";
const Player = () => {
  const {
    // favoriteList,
    // setFavoriteList,
    // activeEpisodeId,
    currentPlayer,
    handleToggleFromBookmark,
    isFavorite,
  } = usePodcastList();

  return (
    <div className="player-container">
      <div className="player-wrapper">
        <div className="player-bookmark">
          <h2 className="playing">正在播放</h2>

          <div
            className="bookmark"
            onClick={() => handleToggleFromBookmark(currentPlayer.id)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_38_14)">
                <path
                  d="M14.1667 2.5H5.83341C4.91675 2.5 4.16675 3.25 4.16675 4.16667V17.5L10.0001 15L15.8334 17.5V4.16667C15.8334 3.25 15.0834 2.5 14.1667 2.5Z"
                  fill={
                    isFavorite(currentPlayer && currentPlayer.id)
                      ? "#FF7F50"
                      : "#FFFFFF"
                  }
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
        <hr />
        <div className="player-content">
          <h2 className="player-content-title">
            {currentPlayer && currentPlayer.name}
          </h2>
          <p className="player-content-text">{currentPlayer.description}</p>
        </div>
        <div id="spotify-player">
          <iframe
            src={
              currentPlayer
                ? `https://open.spotify.com/embed/episode/${currentPlayer.id}`
                : "https://open.spotify.com/track/0Z0NuqK8ITGvhESAlbE7v9?si=23aa2606101c45cc"
            }
            id="embed-iframe"
            //傳遞currentPlayer給html
            data-current-player={
              currentPlayer ? JSON.stringify(currentPlayer) : ""
            }
            title="Spotify Player"
            width="100%"
            height="100%"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Player;
