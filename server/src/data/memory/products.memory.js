import crypto from "crypto";

class ProductManager {
  //Static and private variable
  static #products = [];

  //Methods
  create(data) {
    try {
      const { title, photo, price, stock } = data;
      if (!title || !photo || !price || !stock) {
        throw new Error("Please, enter title, photo, price and stock.");
      }
      if(isNaN(Number(price))) {
        throw new Error("Please, enter a valid price.");
      }
      if(isNaN(Number(stock))) {
        throw new Error("Please, enter a valid stock.");
      }
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: title,
        photo: photo,
        price: Number(price),
        stock: Number(stock)
      };
      ProductManager.#products.push(product);
      return product;
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("There are no products yet.");
      }
      return ProductManager.#products;
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const allProducts = this.read();
      if (typeof allProducts === "string") {
        throw new Error(allProducts);
      }
      const required = allProducts.find((product) => product.id === id);
      if (!required) {
        throw new Error(`The product with the ID ${id} doesn´t exist.`);
      }
      return required;
    } catch (error) {
      return error.message;
    }
  }

  destroy(id) {
    try {
      const required = this.readOne(id);
      if (typeof required === "string") {
        throw new Error(required);
      }
      ProductManager.#products = ProductManager.#products.filter((each) => each.id !== id);
      return required;
    } catch (error) {
      return error.message;
    }
  }

  update(id, data) {
    try {
      const required = this.readOne(id)
      if(typeof required === "string") {
        throw new Error(required)
      }
      const { title, photo, price, stock } = data;
      if (!title && !photo && !price && !stock) {
        throw new Error("Please, enter a new title, photo, price or stock.");
      }
      if((price && isNaN(Number(price)))){
        throw new Error("Please, enter a valid price.");
      }
      if((stock && isNaN(Number(stock)))){
        throw new Error("Please, enter a valid stock.");
      }
      title && (required.title = title)
      photo && (required.photo = photo)
      price && (required.price = Number(price))
      stock && (required.stock = Number(stock))
      return required
    } catch (error) {
      return error.message
    }
  }
}

//Products instance
const productsMemory = new ProductManager();

//Instance export
export default productsMemory;
