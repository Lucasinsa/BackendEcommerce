import Product from "./models/product.model.js";

class ProductManager {
  async create(data) {
    try {
      const one = await Product.create(data);
      return one._id;
    } catch (error) {
      return error.message;
    }
  }

  async read(obj) {
    try {
      const { filter, order } = obj;
      const all = await Product.find(filter).sort(order);
      if (all.length === 0) {
        throw new Error("There are no products yet.");
      }
      return all;
    } catch (error) {
      return error.message;
    }
  }

  async readOne(id) {
    try {
      const one = await Product.findById(id);
      if (!one) {
        throw new Error(`The product with the ID ${id} doesn´t exist.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const one = await Product.findByIdAndDelete(id);
      if (!one) {
        throw new Error(`The product with the ID ${id} doesn´t exist.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async update(id, data) {
    try {
      const { title, photo, price, stock } = data;
      if (!title && !photo && !price && !stock) {
        throw new Error("Please, enter the new title, photo, price or stock.");
      }
      const opt = { new: true };
      const one = await Product.findByIdAndUpdate(id, data, opt);
      if (!one) {
        throw new Error(`The product with the ID ${id} doesn´t exist.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }
}

const products = new ProductManager();

export default products;
