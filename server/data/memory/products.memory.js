import crypto from "crypto";

class ProductManager {
  //Static and private variable
  static #products = [];

  //Methods
  create(data) {
    try {
      const { title, photo, price, stock } = data;
      if (!title || !photo || !price || !stock) {
        throw new Error("Please enter title, photo, price and stock.");
      }
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: title,
        photo: photo,
        price: Number(price),
        stock: Number(stock),
      };
      ProductManager.#products.push(product);
      return true;
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
      return true;
    } catch (error) {
      return error.message;
    }
  }
}

//Products instance
const productsMemory = new ProductManager();

//Instance export
export default productsMemory;
