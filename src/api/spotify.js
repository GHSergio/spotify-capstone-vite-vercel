// import { refreshToken, refreshTokenClick } from "./Author";
import axios from "axios";

// const baseUri = "https://api.spotify.com";
const baseUri = import.meta.env.VITE_SPOTIFY_API_BASE_URI;
// console.log("spotify env:", baseUri);
// 從 localStorage 中獲取 accessToken
const spotifyToken = localStorage.getItem("access_token");

//獲取使用者資訊
export const getUserProfile = async () => {
  //在全域spotifyToken 初始化讀取不到?
  //放在fn內 每次fn執行 都獲取最新
  const spotifyToken = localStorage.getItem("access_token");
  // console.log(spotifyToken);

  const userProfileEndpoint = baseUri + "/v1/me";
  try {
    const response = await axios.get(userProfileEndpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });

    const userProfileData = response.data;
    // console.log("User Profile Data:", userProfileData);
    localStorage.setItem("userProfileData", JSON.stringify(userProfileData));
    return userProfileData;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Unauthorized: Please log in again.");
      } else if (error.response.status === 403) {
        throw new Error("Forbidden: Access is denied.");
      } else {
        throw new Error(`API Error: ${error.response.statusText}`);
      }
    } else {
      throw new Error("Network Error");
    }
  }
};

//取得shows & Episodes
export const getShowWithEpisodes = async (id) => {
  // console.log(id);
  const spotifyToken = localStorage.getItem("access_token");
  const uri = `${baseUri}/v1/shows/${id}`;
  try {
    const showResponse = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    const showData = showResponse.data;
    // console.log(showData);

    return showData;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`The show with ID ${id} does not exist.`);
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
  }
};

export const getShowEpisodes = async (id) => {
  const spotifyToken = localStorage.getItem("access_token");

  const endpoint = `${baseUri}/v1/episodes/${id}/`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });

    // console.log("getShowEpisodes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//取得oEmbed
export const getPlayerSrc = async (id) => {
  const endpoint = `${baseUri}/embed/episode/${id}&_source=oembed`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    // console.log(response);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 4. Search Shows Info

export const searchShows = async (input) => {
  const spotifyToken = localStorage.getItem("access_token");
  const url = baseUri + "/v1/search";
  const params = {
    q: input,
    type: "show",
    limit: 15,
  };

  const config = {
    headers: { Authorization: `Bearer ${spotifyToken}` },
    params,
  };

  const response = await axios
    .get(url, config)
    .then((data) => {
      // console.log(data.data.shows.items);
      return data.data.shows.items;
    })
    .catch(async (err) => {
      if (err.error.status === 401) {
        console.log("驗證問題");
      } else {
        console.log("request failed!!!");
        return "failed";
      }
    });

  if (response !== undefined) {
    return response;
  }
};

export const getArtistProfile = async () => {
  const artistProfileEndpoint =
    "https://api.spotify.com/v1/artists/6xErgeZYatiaQ36SB5bvi8?si=OWLnHt3wSWC-Poq2UOLS4Q";
  try {
    const response = await axios.get(artistProfileEndpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });

    const artistProfileData = response.data;
    // console.log("Artist Profile Data:", artistProfileData);
    return artistProfileData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//獲取分類清單
export const getUserShowList = async () => {
  const endpoint = baseUri + "/v1/me/shows?limit=50";
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    const userShowList = response.data;
    // console.log(userShowList);
    return userShowList;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//獲取
export const getUserPlaylists = async () => {
  const endpoint = baseUri + "/v1/me/playlists";
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    // const userPlaylists = response.data.items;
    const userPlaylists = response.data.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      trackList: [],
    }));
    // console.log(userPlaylists);
    return userPlaylists;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// 獲取播放清單中的歌曲項目
export const getPlaylistTracks = async (playlistId) => {
  const endpoint = `${baseUri}/v1/playlists/${playlistId}/tracks`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    // const playlistTracks = response;
    const playlistTracks = response.data.items;
    // console.log(playlistTracks);
    return playlistTracks;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
