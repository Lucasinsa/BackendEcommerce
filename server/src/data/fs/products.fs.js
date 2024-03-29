import fs from "fs";
import crypto from "crypto";

//Class for product management
class ProductManager {
  constructor(path) {
    this.configuration = "utf-8";
    this.path = path;
    this.products = [];
    this.init();
  }

  //Method to initialize the array or .json
  init() {
    fs.existsSync(this.path)
      ? (this.products = JSON.parse(
          fs.readFileSync(this.path, this.configuration)
        ))
      : fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    return true;
  }

  //Method to create a product and add it to the .json
  async create(data) {
    try {
      const { title, photo, price, stock } = data;
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: title,
        photo: photo,
        price: Number(price),
        stock: Number(stock),
      };
      this.products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      return product;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read all products of the .json
  read() {
    try {
      if (this.products.length === 0) {
        throw new Error("There are no products yet.");
      }
      return this.products;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read one product of the .json
  readOne(id) {
    try {
      const allProducts = this.read();
      if (typeof allProducts === "string") {
        throw new Error(allProducts);
      }
      const required = allProducts.find((each) => each.id === id);
      if (!required) {
        throw new Error(`The product with the ID ${id} doesn´t exist.`);
      }
      return required;
    } catch (error) {
      return error.message;
    }
  }

  //Method to delete a product of the .json
  async destroy(id) {
    try {
      const required = this.readOne(id);
      if (typeof required === "string") {
        throw new Error(required);
      }
      this.products = this.products.filter((each) => each.id !== id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      return required;
    } catch (error) {
      return error.message;
    }
  }

  //Method to update a product of the .json
  async update(id, data) {
    try {
      const required = this.readOne(id);
      if (typeof required === "string") {
        throw new Error(required);
      }
      const { title, photo, price, stock } = data;
      if (!title && !photo && !price && !stock) {
        throw new Error("Please, enter the new title, photo, price or stock.");
      }
      if (price && isNaN(Number(price))) {
        throw new Error("Please, enter a valid price.");
      }
      if (stock && isNaN(Number(stock))) {
        throw new Error("Please, enter a valid stock.");
      }
      title && (required.title = title);
      photo && (required.photo = photo);
      price && (required.price = Number(price));
      stock && (required.stock = Number(stock));
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      return required;
    } catch (error) {
      return error.message;
    }
  }
}

//Products instance
const products = new ProductManager("./src/data/fs/files/products.json");

//Instance export
export default products;
