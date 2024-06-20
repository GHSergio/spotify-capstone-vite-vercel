import Swal from "sweetalert2";

const addFavoriteSuccess = () => {
  Swal.fire({
    icon: "success",
    width: "250px",
    text: "成功加入收藏  😊",
    heightAuto: false,
    position: "bottom-end",
    timer: 1000,
    showConfirmButton: false,
  });
};
const removeFavoriteSuccess = () => {
  Swal.fire({
    icon: "success",
    width: "250px",
    text: "成功移除收藏  😊",
    heightAuto: false,
    position: "bottom-end",
    timer: 1000,
    showConfirmButton: false,
  });
};
const addFavoriteFail = () => {
  Swal.fire({
    icon: "error",
    width: "250px",
    text: "加入收藏失敗  😢",
    heightAuto: false,
    position: "bottom-end",
    timer: 1000,
    showConfirmButton: false,
  });
};
const addFavoriteError = () => {
  Swal.fire({
    icon: "warning",
    width: "250px",
    text: "發生未知錯誤  🤔",
    heightAuto: false,
    position: "bottom-end",
    timer: 1000,
    showConfirmButton: false,
  });
};
const removeFavoriteFail = () => {
  Swal.fire({
    icon: "error",
    width: "250px",
    text: "移除收藏失敗  😢",
    heightAuto: false,
    position: "bottom-end",
    timer: 1000,
    showConfirmButton: false,
  });
};
const removeFavoriteError = () => {
  Swal.fire({
    icon: "warning",
    width: "250px",
    text: "發生未知錯誤  🤔",
    heightAuto: false,
    position: "bottom-end",
    timer: 1000,
    showConfirmButton: false,
  });
};

export {
  addFavoriteSuccess,
  removeFavoriteSuccess,
  addFavoriteFail,
  addFavoriteError,
  removeFavoriteFail,
  removeFavoriteError,
};
