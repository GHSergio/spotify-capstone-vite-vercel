import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faVanShuttle,
  faBook,
  faBed,
  faPodcast,
  faHeart,
  faBookmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const BusIcon = () => <FontAwesomeIcon icon={faVanShuttle} />;
const LearnIcon = () => <FontAwesomeIcon icon={faBook} />;
const PreSleep = () => <FontAwesomeIcon icon={faBed} />;
const PodcastIcon = () => <FontAwesomeIcon icon={faPodcast} />;
const Favorite = () => (
  <FontAwesomeIcon icon={faHeart} style={{ color: "#fa0000" }} />
);

const BookmarkIcon = () => <FontAwesomeIcon icon={faBookmark} />;
const AddIcon = () => (
  <FontAwesomeIcon icon={faPlus} style={{ color: "#74C0FC" }} />
);

export {
  BusIcon,
  LearnIcon,
  PreSleep,
  PodcastIcon,
  Favorite,
  BookmarkIcon,
  AddIcon,
};
