import "../../styles/footer.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const userProfileData = JSON.parse(localStorage.getItem("userProfileData"));

  const handleLogout = () => {
    // 移除所有 localStorage 項目
    localStorage.clear();
    // 跳轉到登錄頁面
    navigate("/login");
  };

  //切換顯示logout選項
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  //avatar只顯示userName第一個字
  const getInitials = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <div className="user-container">
        <div className="user-wrapper">
          {userProfileData && userProfileData.images.length > 0 ? (
            <img
              className="user-avatar"
              src={userProfileData.images[0].url}
              alt={`${userProfileData.display_name}'s avatar`}
            />
          ) : (
            <div className="avatar-placeholder">
              {getInitials(userProfileData.display_name)}
            </div>
          )}
          {/* <img
            className="user-avatar"
            src="https://s3-alpha-sig.figma.com/img/be47/616a/4ce30b5d2f2773c5785f9dc061ceff73?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fiRG4okOqNtAU1D-WJtUTtAG7a5eU0tHuAgdwNPXw1-1sQ-cAoZM5-gSrUdxQAyi5Mwg6N0ANFQ2nlqVjAXGD2b3GJx171IXvSrO7~TYc-dd4jVMDt11~69j0GmYV70dto~vSGwiMbAPiqguQZsk1suGAF2mI~QarAPCYZKHRmG2F-F51VHjqyCMVJ~bgaF3JMoZq0Z2TIj2-s14bCNqoV1Oykl2LENM7L5Ij90VByHR7lIt-g60H1AUh-XxgtLQSBRLJ4iaZ4BaqlLkyfp~eDh7k3ZK9I5zBRYfAXymWo1jPuYKr4reOQEj2QSY9lZaKJoSKjV5ZJOmBvxs-~K8-g__"
            alt="user"
          /> */}
          <span className="user-name">
            {userProfileData && userProfileData.display_name}
          </span>
        </div>
        <div className="chevron-down" onClick={toggleLogout}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="#718096"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {showLogout && (
        <div className="logout-dropdown">
          <button onClick={handleLogout}>登出</button>
        </div>
      )}
    </>
  );
};

export default User;
