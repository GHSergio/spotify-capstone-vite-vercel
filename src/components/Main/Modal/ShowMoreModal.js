import "../../../styles/showMoreModal.scss";
import { usePodcastList } from "../../../contexts/PodcastListContext";
import ListItem from "../ListItem";
import { deleteFromCategory } from "../../../api/acRequest";

const ShowMoreModal = ({ isOpen, onClose, card }) => {
  const {
    handleDeleteChannel,
    selectedCard,
    setSelectedCard,
    handleClickListItem,
    handleClickPlayer,
    activeList,
    categoryContent,
    setCategoryContent,
  } = usePodcastList();

  const currentCategoryId = categoryContent[activeList].id;
  // console.log("currentCategoryId:", currentCategoryId);
  //處理delete
  const handleDelete = async (categoryId, showId) => {
    const result = await deleteFromCategory(categoryId, showId);
    if (result.data.success) {
      const updatedCategories = categoryContent.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              savedShows: category.savedShows.filter(
                (show) => show.id !== showId
              ),
            }
          : category
      );
      setCategoryContent(updatedCategories);
      localStorage.setItem(
        "userCategoryContent",
        JSON.stringify(updatedCategories)
      );
    } else {
      console.error(result.message);
    }
    setSelectedCard(null);
    onClose();
  };
  // console.log("activeEpisodeId:", activeEpisodeId);

  // console.log(card && card, selectedCard && selectedCard);
  return (
    <>
      {isOpen && card && (
        <div className="modal-overlay" onClick={onClose}>
          <div
            className="more-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="more-modal-wrapper">
              <div className="more-modal-header">
                <div className="more-modal-header-img">
                  <img src={card.imageUrl} alt="" />
                </div>
                <div className="more-modal-header-content">
                  <span className="content-title">{card.title}</span>
                  <span className="content-type">{card.publisher}</span>
                  <span className="content-text">{card.description}</span>
                </div>

                <svg
                  className="button-close"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={onClose}
                >
                  <g clipPath="url(#clip0_37_3297)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="#93989A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_37_3297">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(currentCategoryId, card.id)}
                >
                  <p>刪除</p>
                </button>
              </div>

              {/* videoList */}
              {card.episodes &&
                card.episodes.items.map((item, index) => (
                  <ListItem
                    key={index}
                    item={item}
                    handleClickListItem={() => handleClickListItem?.(item.id)}
                    handleClickPlayer={() => handleClickPlayer?.(item)}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowMoreModal;
