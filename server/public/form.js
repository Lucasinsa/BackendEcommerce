const socket = io();

const title = document.getElementById("input-title");
const photo = document.getElementById("input-photo");
const price = document.getElementById("input-price");
const stock = document.getElementById("input-stock");

document.getElementById("btn-create").addEventListener("click", (event) => {
  event.preventDefault();
  const data = {};
  title && (data.title = title.value);
  photo && (data.photo = photo.value);
  price && (data.price = price.value);
  stock && (data.stock = stock.value);
  socket.emit("new product", data);
});

socket.on("propsProductError", (data) => {
  const propsError = document.getElementById("props-error");
  if (data.error) {
    propsError.classList.replace("d-none", "d-block");
    propsError.innerText = data.message;
  } else {
    propsError.classList.replace("d-block", "d-none");
    title.value = "";
    photo.value = "";
    price.value = "";
    stock.value = "";
  }
});
