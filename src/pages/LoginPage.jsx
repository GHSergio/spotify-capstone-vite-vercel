import { useState, useCallback } from "react";
import LoginWrapper from "../components/Login/LoginWrapper.jsx";
import SideIllustration from "../components/Login/SideIllustration.jsx";
// import "../styles/loginContainer.scss";
import "../styles/loginContainer.css";
import Login1 from "../assets/Login1.svg";
import Login2 from "../assets/Login2.svg";
import Login3 from "../assets/Login3.svg";
console.log(Login1);
const Login = () => {
  const [activeCounter, setActiveCounter] = useState(1);
  const loginData = [
    {
      id: 1,
      title: "鼓舞人心的故事",
      text: "從非凡的人生故事和成功經歷中獲得靈感",
      background: "#23262f",
      imgSrc: Login1,
    },
    {
      id: 2,
      title: "輕鬆分類與管理",
      text: "一目了然的分類，讓收藏的 Podcast 保持整潔",
      background: "#2d3831",
      imgSrc: Login2,
    },
    {
      id: 3,
      title: "Spotify 快速同步",
      text: "透過 Spotify 登入，即刻同步您的收藏，隨時隨地收聽",
      background: "#063540",
      imgSrc: Login3,
    },
  ];
  const handleArrowLeftClick = useCallback(() => {
    setActiveCounter((prevCounter) =>
      prevCounter === 1 ? loginData.length : prevCounter - 1
    );
  }, [loginData.length]);

  const handleArrowRightClick = useCallback(() => {
    setActiveCounter((prevCounter) =>
      prevCounter === loginData.length ? 1 : prevCounter + 1
    );
  }, [loginData.length]);

  return (
    <>
      <div className="login-container">
        <div className="left-container">
          <LoginWrapper />
        </div>
        <div className="right-container">
          <SideIllustration
            activeCounter={activeCounter}
            title={loginData[activeCounter - 1].title}
            text={loginData[activeCounter - 1].text}
            background={loginData[activeCounter - 1].background}
            imgSrc={loginData[activeCounter - 1].imgSrc}
            handleArrowLeftClick={handleArrowLeftClick}
            handleArrowRightClick={handleArrowRightClick}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
