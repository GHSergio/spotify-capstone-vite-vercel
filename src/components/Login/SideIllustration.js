import { useEffect, useRef, useCallback } from "react";
import Counter from "./Counter";
const SideIllustration = ({
  title,
  text,
  activeCounter,
  background,
  imgSrc,
  handleArrowLeftClick,
  handleArrowRightClick,
}) => {
  const timerRef = useRef(null); // 用來存儲計時器的引用

  // 自動切換active & 圖片
  useEffect(() => {
    startAutoSwitch(); // 開始自動切換
    return () => stopAutoSwitch(); // 組件卸載時停止計時器
  }, []);

  // 自動切換函數
  const handleAutoSwitch = useCallback(() => {
    // 餘數永遠都會在 0 到 (陣列長度 - 1) 的範圍內。
    const nextCounter = (activeCounter % imgSrc.length) + 1;
    handleArrowRightClick(nextCounter);
  }, [activeCounter, imgSrc.length, handleArrowRightClick]);

  // 停止自動切換
  const stopAutoSwitch = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  // 啟動自動切換
  const startAutoSwitch = useCallback(() => {
    timerRef.current = setInterval(() => {
      handleAutoSwitch();
    }, 2000);
  }, [handleAutoSwitch]);

  // 滑鼠進入，停止自動切換
  const handleMouseEnter = useCallback(() => {
    stopAutoSwitch();
  }, [stopAutoSwitch]);

  // 滑鼠離開，啟動自動切換
  const handleMouseLeave = useCallback(() => {
    startAutoSwitch();
  }, [startAutoSwitch]);

  return (
    <>
      <div
        className="SideIllustration"
        style={{ background: background }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={imgSrc} alt="" className="font" />

        <div className="controller">
          <div className="arrow-left" onClick={handleArrowLeftClick}>
            <svg
              width="13"
              height="20"
              viewBox="0 0 13 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6833 17.65L5.05 10L12.6833 2.35L10.3333 0L0.333336 10L10.3333 20L12.6833 17.65Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="arrow-right" onClick={handleArrowRightClick}>
            <svg
              width="13"
              height="20"
              viewBox="0 0 13 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.31665 17.65L7.94998 10L0.31665 2.35L2.66665 0L12.6667 10L2.66665 20L0.31665 17.65Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="counters">
            <Counter active={activeCounter === 1} />
            <Counter active={activeCounter === 2} />
            <Counter active={activeCounter === 3} />
          </div>
        </div>
        <div className="shadow"></div>
        <div className="content">
          <span className="title">{title}</span>
          <p className="text">{text}</p>
        </div>
      </div>
    </>
  );
};

export default SideIllustration;
