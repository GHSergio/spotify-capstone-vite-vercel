import Hamburger from "./Hamburger";
import { usePodcastList } from "../../contexts/PodcastListContext";
const NavigationItem = ({
  index,
  emoji,
  title,
  activeDropdown,
  handleNavigationItem,
  handleDropdownClick,
}) => {
  const { activeList, handleOpenListActionModal } = usePodcastList();
  // console.log("navigation接收到的:", emoji,title);
  return (
    <li
      className={activeList === index ? "list-item active" : "list-item"}
      key={index}
      onClick={() => handleNavigationItem(index)}
    >
      <div className="list-item-content">
        <span className="emoji">{emoji ? emoji : "❓"}</span>
        <p className="list-item-title">{title && title}</p>
      </div>
      {title !== "收藏清單" && (
        <div className="hamburger-container">
          <Hamburger
            isActive={activeDropdown}
            onClick={handleDropdownClick}
            handleOpenModal={handleOpenListActionModal}
          />
        </div>
      )}
    </li>
  );
};

export default NavigationItem;
