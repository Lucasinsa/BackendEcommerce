const fs = require("fs");

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
  create(data) {
    try {
      const { title, photo, price, stock } = data;
      if (!title || !photo || !price || !stock) {
        throw new Error("Please enter title, photo, price and stock.");
      }
      const product = {
        id: this.products.length + 1,
        title: title,
        photo: photo,
        price: price,
        stock: stock,
      };
      this.products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      return true;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read all products of the .json
  async read() {
    try {
      const dataJSON = await fs.promises.readFile(
        this.path,
        this.configuration
      );
      const data = JSON.parse(dataJSON);
      if (!Array.isArray(data)) {
        throw new Error(`The content of the .json is not an array.`);
      }
      if (data.length === 0) {
        throw new Error("There are no products yet.");
      }
      return data;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read one product of the .json
  async readOne(id) {
    try {
      const data = await this.read();
      if (typeof data === "object") {
        const one = data.find((each) => each.id === Number(id));
        if (!one) {
          throw new Error(`The product with the ID ${id} doesn´t exist.`);
        }
        return one;
      } else {
        throw new Error(data);
      }
    } catch (error) {
      return error.message;
    }
  }
}

//Testing
const products = new ProductManager("./data/products.json");

const main = async () => {
  console.log("----- First products read -----");
  console.log(await products.read());
  console.log("----- I try to pass as argument an object without all properties -----");
  console.log(products.create({ title: "Remera roja" }));
  console.log("----- I create products -----");
  console.log(products.create({title: "Pantalón negro", photo: "url", price: 424245, stock: 100,}));
  console.log(products.create({title: "Remera gris", photo: "url", price: 43254, stock: 47,}));
  console.log("----- Second products read -----");
  console.log(await products.read());
  console.log("----- I read product with ID 1 -----");
  console.log(await products.readOne(1));
  console.log("----- I read product with ID 34532 -----");
  console.log(await products.readOne(34532));
};

main();
