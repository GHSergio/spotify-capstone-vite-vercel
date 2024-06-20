import { usePodcastList } from "../../contexts/PodcastListContext";
import ShowMoreModal from "./Modal/ShowMoreModal";
const Card = ({
  id,
  title,
  publisher,
  imageUrl,
  description,
  episodes,
  onClick,
  active, //從addCardModal傳入
}) => {
  const {
    showMoreModal,
    handleOpenShowMoreModal,
    handleCloseShowMoreModal,

    selectedCard,
    setSelectedCard,
  } = usePodcastList();

  //傳遞參數給setSelectedCard
  const handleClickMore = (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    setSelectedCard({ id, title, publisher, imageUrl, description, episodes });
    handleOpenShowMoreModal();
  };

  return (
    <>
      <div
        className={`card-container ${active ? "active" : ""}`}
        onClick={onClick}
      >
        <div className="card-wrapper">
          <div className="card-cover">
            <img className="card-cover-img" src={imageUrl} alt="" />
          </div>
          <div className="card-content">
            <h2 className="card-content-title">{title}</h2>
            <p className="card-content-type">{publisher}</p>
          </div>
          <button className="button-more" onClick={handleClickMore}>
            更多
          </button>
        </div>
      </div>
      <ShowMoreModal
        isOpen={showMoreModal}
        onClose={handleCloseShowMoreModal}
        card={selectedCard}
      />
    </>
  );
};

export default Card;
