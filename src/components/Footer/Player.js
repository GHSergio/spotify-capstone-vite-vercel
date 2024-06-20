import "../../styles/footer.scss";
import React from "react";
import { usePodcastList } from "../../contexts/PodcastListContext";
import { PostFavorite, RemoveFavorite } from "../../api/acRequest.js";
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
        {/* <div className="player-spotify-container">
          <div className="player-spotify-wrapper">
            <div className="spotify-logo">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9994 0.0395508C5.39242 0.0395508 0.0361328 5.39569 0.0361328 12.0027C0.0361328 18.61 5.39242 23.9657 11.9994 23.9657C18.6071 23.9657 23.9628 18.61 23.9628 12.0027C23.9628 5.39612 18.6071 0.0401222 11.9993 0.0401222L11.9994 0.0395508ZM17.4857 17.2938C17.2714 17.6453 16.8114 17.7567 16.46 17.541C13.6511 15.8253 10.1151 15.4367 5.95085 16.3881C5.54956 16.4796 5.14956 16.2281 5.05813 15.8267C4.96628 15.4253 5.2167 15.0253 5.61899 14.9338C10.1761 13.8923 14.0851 14.341 17.2386 16.2681C17.59 16.4838 17.7014 16.9424 17.4857 17.2938ZM18.95 14.036C18.68 14.4753 18.1057 14.6138 17.6671 14.3438C14.4514 12.3668 9.54956 11.7944 5.74599 12.949C5.2527 13.098 4.7317 12.82 4.58199 12.3276C4.43342 11.8343 4.71156 11.3143 5.20399 11.1643C9.5487 9.84598 14.95 10.4846 18.6428 12.7538C19.0814 13.0238 19.22 13.598 18.95 14.036ZM19.0757 10.644C15.22 8.35384 8.85856 8.14326 5.17728 9.26055C4.58613 9.43984 3.96099 9.10612 3.78185 8.51498C3.6027 7.92355 3.93613 7.29884 4.5277 7.11912C8.75356 5.83627 15.7786 6.08412 20.2177 8.71941C20.7506 9.03498 20.9248 9.72169 20.6091 10.2527C20.2948 10.7844 19.6063 10.9597 19.0763 10.644H19.0757Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="spotify-img">
              {currentPlayer && currentPlayer ? (
                <img src={currentPlayer.imgSrc} alt="" />
              ) : (
                <img
                  src="https://s3-alpha-sig.figma.com/img/5dd4/51a2/cee37a4e1c59c120458b2f5371cc9e69?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WxZgDjPTsRkP~yTuyX8pdTfyxkzS~l-vVQ7UG469I-Oz7xYBjxfgeoa2rxbdTzbyeLofXxpyTcrUxAcnW4R4t6HMIw5f0qavOU5~W~2kOwVCfn9TbWVv3o60SPAabHHv1Nf~SULNjojQvMYyMXd0IXHchbhDSRulGrEcy3bCan8e1y6vz3sLd0mJ0BvVBLi0VnI9lx4AEy0OLEBSfLYGxg76mt7laLg2jaPv4E1d8Mi5TsQHb0etbHJju9pn4J-WAFhElEsXQxDQp6YUaLDZR8MG0oSB8EmhxObpQIr2UnHd8Lurgts2W~wslNsBooZXlv1U5JqgJYPL1tXY-cUb4A__"
                  alt=""
                />
              )}
            </div>
            <div className="spotify-content">
              <p className="spotify-content-title">
                {currentPlayer && currentPlayer.title}
              </p>
              <p className="spotify-content-date">
                {currentPlayer && currentPlayer.date}・{formattedVideoLength()}
              </p>
            </div>

            <div
              id="spotify-player"
              className="spotify-controller-container"
              src="https://open.spotify.com/embed/episode/2l2rRYeI9vuvvIFtzhzoQ0?si=0f89504426544688"
            >
              <div className="controller-back">
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.96669 12.6667C3.76003 12.6667 1.96669 10.8734 1.96669 8.66675H0.633362C0.633362 11.6134 3.02003 14.0001 5.96669 14.0001C8.91336 14.0001 11.3 11.6134 11.3 8.66675C11.3 5.72008 8.91336 3.33341 5.96669 3.33341V0.666748L2.63336 4.00008L5.96669 7.33341V4.66675C8.17336 4.66675 9.96669 6.46008 9.96669 8.66675C9.96669 10.8734 8.17336 12.6667 5.96669 12.6667ZM4.96616 10.6667V7.823H4.90561L3.65952 8.25464V8.75464L4.30796 8.56519V10.6667H4.96616ZM5.86851 9.27612L6.39194 9.39917C6.41668 9.36532 6.4564 9.33211 6.51108 9.29956C6.56577 9.26701 6.64064 9.25073 6.73569 9.25073C6.80731 9.25073 6.86851 9.26115 6.91929 9.28198C6.97137 9.30282 7.01369 9.33342 7.04624 9.37378C7.07879 9.41284 7.10223 9.46037 7.11655 9.51636C7.13218 9.57235 7.13999 9.6355 7.13999 9.70581C7.13999 9.77222 7.13478 9.83537 7.12436 9.89526C7.11395 9.95386 7.09637 10.0059 7.07163 10.0515C7.04689 10.0971 7.01304 10.1329 6.97007 10.1589C6.9271 10.185 6.87306 10.198 6.80796 10.198C6.74416 10.198 6.68752 10.1843 6.63804 10.157C6.58986 10.1283 6.55145 10.0886 6.5228 10.0378C6.49416 9.98706 6.47788 9.92717 6.47397 9.85815H5.81186C5.81056 9.98836 5.83726 10.1062 5.89194 10.2117C5.94793 10.3158 6.02345 10.405 6.11851 10.4792C6.21486 10.5522 6.32293 10.6082 6.44272 10.6472C6.56252 10.6863 6.68556 10.7058 6.81186 10.7058C6.98114 10.7058 7.12762 10.6798 7.25132 10.6277C7.37502 10.5743 7.47723 10.5027 7.55796 10.4128C7.63999 10.3217 7.70054 10.2195 7.7396 10.1062C7.77996 9.99162 7.80015 9.87313 7.80015 9.75073C7.80015 9.59839 7.78061 9.46297 7.74155 9.34448C7.70379 9.22599 7.64715 9.12638 7.57163 9.04565C7.49611 8.96362 7.40366 8.90177 7.29429 8.86011C7.18621 8.81714 7.06186 8.79565 6.92124 8.79565C6.83009 8.79565 6.74676 8.80867 6.67124 8.83472C6.59702 8.85946 6.54429 8.88094 6.51304 8.89917L6.57749 8.33472H7.70249V7.823H6.04038L5.86851 9.27612Z"
                    fill="white"
                    fillOpacity="0.8"
                  />
                </svg>
              </div>
              <div className="controller-time">
                <svg
                  width="84"
                  height="4"
                  viewBox="0 0 84 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="84" height="4" rx="2" fill="#CCCCCC" />
                  <rect width="30" height="4" rx="2" fill="white" />
                </svg>
              </div>
              <div className="controller-fast">
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.96669 12.6667C8.17336 12.6667 9.96669 10.8734 9.96669 8.66675H11.3C11.3 11.6134 8.91336 14.0001 5.96669 14.0001C3.02003 14.0001 0.633362 11.6134 0.633362 8.66675C0.633362 5.72008 3.02003 3.33341 5.96669 3.33341V0.666748L9.30003 4.00008L5.96669 7.33341V4.66675C3.76003 4.66675 1.96669 6.46008 1.96669 8.66675C1.96669 10.8734 3.76003 12.6667 5.96669 12.6667ZM4.96617 10.6667V7.823H4.90562L3.65953 8.25464V8.75464L4.30796 8.56519V10.6667H4.96617ZM5.86851 9.27612L6.39195 9.39917C6.41669 9.36532 6.4564 9.33211 6.51109 9.29956C6.56578 9.26701 6.64065 9.25073 6.7357 9.25073C6.80731 9.25073 6.86851 9.26115 6.91929 9.28198C6.97138 9.30282 7.01369 9.33342 7.04625 9.37378C7.0788 9.41284 7.10223 9.46037 7.11656 9.51636C7.13218 9.57235 7.14 9.6355 7.14 9.70581C7.14 9.77222 7.13479 9.83537 7.12437 9.89526C7.11395 9.95386 7.09638 10.0059 7.07164 10.0515C7.0469 10.0971 7.01304 10.1329 6.97007 10.1589C6.9271 10.185 6.87307 10.198 6.80796 10.198C6.74416 10.198 6.68752 10.1843 6.63804 10.157C6.58987 10.1283 6.55145 10.0886 6.52281 10.0378C6.49416 9.98706 6.47789 9.92717 6.47398 9.85815H5.81187C5.81057 9.98836 5.83726 10.1062 5.89195 10.2117C5.94794 10.3158 6.02346 10.405 6.11851 10.4792C6.21486 10.5522 6.32294 10.6082 6.44273 10.6472C6.56252 10.6863 6.68557 10.7058 6.81187 10.7058C6.98114 10.7058 7.12763 10.6798 7.25132 10.6277C7.37502 10.5743 7.47723 10.5027 7.55796 10.4128C7.64 10.3217 7.70054 10.2195 7.7396 10.1062C7.77997 9.99162 7.80015 9.87313 7.80015 9.75073C7.80015 9.59839 7.78062 9.46297 7.74156 9.34448C7.7038 9.22599 7.64716 9.12638 7.57164 9.04565C7.49612 8.96362 7.40367 8.90177 7.29429 8.86011C7.18622 8.81714 7.06187 8.79565 6.92125 8.79565C6.8301 8.79565 6.74677 8.80867 6.67125 8.83472C6.59703 8.85946 6.54429 8.88094 6.51304 8.89917L6.5775 8.33472H7.7025V7.823H6.04039L5.86851 9.27612Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="controller-more">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_265_113)">
                    <path
                      d="M4.00002 6.66675C3.26669 6.66675 2.66669 7.26675 2.66669 8.00008C2.66669 8.73341 3.26669 9.33341 4.00002 9.33341C4.73335 9.33341 5.33335 8.73341 5.33335 8.00008C5.33335 7.26675 4.73335 6.66675 4.00002 6.66675ZM12 6.66675C11.2667 6.66675 10.6667 7.26675 10.6667 8.00008C10.6667 8.73341 11.2667 9.33341 12 9.33341C12.7334 9.33341 13.3334 8.73341 13.3334 8.00008C13.3334 7.26675 12.7334 6.66675 12 6.66675ZM8.00002 6.66675C7.26669 6.66675 6.66669 7.26675 6.66669 8.00008C6.66669 8.73341 7.26669 9.33341 8.00002 9.33341C8.73335 9.33341 9.33335 8.73341 9.33335 8.00008C9.33335 7.26675 8.73335 6.66675 8.00002 6.66675Z"
                      fill="white"
                      fillOpacity="0.8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_265_113">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="icon-player">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_265_126)">
                    <path
                      d="M20 3.33325C10.8 3.33325 3.33331 10.7999 3.33331 19.9999C3.33331 29.1999 10.8 36.6666 20 36.6666C29.2 36.6666 36.6666 29.1999 36.6666 19.9999C36.6666 10.7999 29.2 3.33325 20 3.33325ZM18.3333 26.6666H15V13.3333H18.3333V26.6666ZM25 26.6666H21.6666V13.3333H25V26.6666Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_265_126">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Player;
