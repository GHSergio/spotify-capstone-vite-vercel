import { useCallback } from "react";
import { loginWithSpotifyClick } from "../../api/Author";

const SpotifyAuthButton = () => {
  const handleAuthClick = useCallback(async () => {
    try {
      await loginWithSpotifyClick();
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  return (
    <div>
      <button className="login-button" onClick={handleAuthClick}>
        <p className="button-content"> 使用 SPOTIFY 帳號登入</p>
      </button>
    </div>
  );
};

export default SpotifyAuthButton;
