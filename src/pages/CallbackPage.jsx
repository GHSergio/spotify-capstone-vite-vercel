import { useEffect, useState } from "react";
import { getUserProfile } from "../api/spotify";
import {
  CreateAccount,
  GetFavoriteIds,
  GetCategory,
  AddCategory,
} from "../api/acRequest";
import { useNavigate } from "react-router-dom";
import { getCategoryEmoji } from "../api/supabaseApi";
import "../styles/progressBar.css";
// import { handleAddCategory } from "../components/Main/Modal/ListActionModal";

const Callback = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // 進度狀態
  const [error, setError] = useState(null); // 錯誤狀態
  const navigate = useNavigate();
  // console.log("目前進度:", progress);

  // 進度更新的函數，確保進度條隨時更新
  const updateProgress = (value) => {
    setProgress((prev) => {
      const newValue = prev + value;
      return newValue > 100 ? 100 : newValue;
    });
  };

  //取得驗證碼後 獲取各項data 並且存入localStorage
  useEffect(() => {
    const spotifyToken = localStorage.getItem("access_token");
    // console.log("spotifyToken:", spotifyToken);

    const fetchData = async () => {
      try {
        // setToken(spotifyToken);
        // 1. 取得 Spotify 使用者資訊
        const userProfileData = await getUserProfile(spotifyToken);
        // console.log("取得使用者資訊", userProfileData);
        // setProgress(10);
        updateProgress(10);

        // 2. 取得 acApi 帳戶 & acToken
        await CreateAccount();
        // setProgress(20);
        updateProgress(10);

        updateProgress(20);
        // 3. 取得ac收藏清單 單集 ID
        const userFavoriteList = await GetFavoriteIds();
        // console.log("取得使用者收藏清單:", userFavoriteList);

        // setProgress(40);
        updateProgress(20);

        // // 插入測試數據
        // await addTestData();

        // 4. 使用 supabase API 獲取 categoryEmoji
        const categoryEmojiData = await getCategoryEmoji();
        // console.log("取得清單映射表情categoryEmojiData:", categoryEmojiData);
        // 存儲到localStorage
        // localStorage.setItem("userEmojis", JSON.stringify(categoryEmojiData));
        updateProgress(20);

        // 5. 獲取ac清單內容
        const userCategoryContent = await GetCategory();
        // 檢查是否為空數組
        if (userCategoryContent.length === 0) {
          // 創建預設分類
          const defultCategory = await AddCategory("預設清單");
          userCategoryContent.push(defultCategory);
        }
        console.log("映射表情之前userCategoryContent:", userCategoryContent);

        //添加屬性映射 emoji 到分類清單 & 存入localStorage
        const addedEmojiCategoryContent = userCategoryContent?.map(
          (category) => {
            const emojiEntry = categoryEmojiData.data.find(
              (emoji) => parseInt(emoji.id) === parseInt(category.id)
            );
            // console.log("emojiEntry:", emojiEntry);
            return {
              ...category,
              emoji: emojiEntry ? emojiEntry.emoji : "🎵",
            };
          }
        );

        localStorage.setItem(
          "userCategoryContent",
          JSON.stringify(addedEmojiCategoryContent)
        );
        console.log(
          "映射表情後的userCategoryContent:",
          addedEmojiCategoryContent
        );

        // setProgress(100); // 更新進度
        updateProgress(20);

        console.log("progress:100%, 獲取初始資料完畢");
        // 初始化完成，延遲 2 秒后重定向到主頁
        setTimeout(() => {
          navigate("/main");
        }, 2000);
      } catch (error) {
        console.error("初始化過程中發生錯誤:", error);
        setError(error.message); // 設置錯誤信息
      } finally {
        setLoading(false); // 關閉加載動畫
      }
    };

    if (spotifyToken) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  //驗證失敗時 onClick引導回login
  const handleLoginAgain = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <div className="progress-overlay">
        {loading ? (
          <>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text">
              {" "}
              獲取初始數據中, 請耐心等待...目前進度:{progress}%
            </div>
          </>
        ) : error ? (
          <>
            <h1 className="error-message">發生錯誤: {error}</h1>
            {(error.includes("Unauthorized") ||
              error.includes("Forbidden")) && (
              <button
                style={{
                  padding: "10px 20px",
                  fontSize: "25px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "px",
                  cursor: "pointer",
                }}
                onClick={handleLoginAgain}
              >
                重新登入
              </button>
            )}
          </>
        ) : (
          <h1>數據獲取完成，即將前往主頁...</h1>
        )}
      </div>
    </>
  );
};

export default Callback;
