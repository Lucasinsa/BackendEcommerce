import propsProductsUtils from "../src/utils/propsProducts.utils.js";
import { products } from "../src/data/mongo/manager.mongo.js";

const title = document.getElementById("input-title");
const photo = document.getElementById("input-photo");
const price = document.getElementById("input-price");
const stock = document.getElementById("input-stock");

document.getElementById("btn-create").addEventListener("click", async(event) => {
  event.preventDefault();
  const data = {};
  title && (data.title = title.value);
  photo && (data.photo = photo.value);
  price && (data.price = price.value);
  stock && (data.stock = stock.value);
  const propsError = document.getElementById("props-error");
  try {
    propsProductsUtils(data)
    propsError.classList.replace("d-none", "d-block");
    propsError.innerText = data.message;
    await products.create(data)
  } catch (error) {
    propsError.classList.replace("d-block", "d-none");
    title.value = "";
    photo.value = "";
    price.value = "";
    stock.value = "";
  }
});
