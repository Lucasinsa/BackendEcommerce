import fs from "fs";
import crypto from "crypto";

//Class for order management
class OrderManager {
  constructor(path) {
    this.configuration = "utf-8";
    this.path = path;
    this.orders = [];
    this.init();
  }

  //Method to initialize the array or .json
  init() {
    fs.existsSync(this.path)
      ? (this.orders = JSON.parse(
          fs.readFileSync(this.path, this.configuration)
        ))
      : fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    return true;
  }

  //Method to create an order and add it to the .json
  async create(data) {
    try {
      const { pid, uid, quantity, state } = data;
      if (!pid || !uid || !quantity || !state) {
        throw new Error("Please, enter the pid, uid, quantity and state.");
      }
      if (typeof pid !== "string" || typeof uid !== "string") {
        throw new Error("The pid and uid must be a string.");
      }
      if (isNaN(Number(quantity)) || quantity <= 0) {
        throw new Error("The quantity must be a number higher than 0.");
      }
      const order = {
        id: crypto.randomBytes(12).toString("hex"),
        pid: pid,
        uid: uid,
        quantity: Number(quantity),
        state: state,
      };
      this.orders.push(order);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, 2)
      );
      return order;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read all products of the .json
  read() {
    try {
      if (this.orders.length === 0) {
        throw new Error("There are no orders yet.");
      }
      return this.orders;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read all orders of one user of the .json
  readOne(uid) {
    try {
      const allOrders = this.read();
      if (typeof allOrders === "string") {
        throw new Error(allOrders);
      }
      const userOrders = allOrders.filter((order) => order.uid === uid);
      if (userOrders.length === 0) {
        throw new Error(`The user with ID ${uid} doesn´t have orders yet.`);
      }
      return userOrders;
    } catch (error) {
      return error.message;
    }
  }

  //Method to delete an order of the .json
  async destroy(oid) {
    try {
      const allOrders = this.read();
      if (typeof allOrders === "string") {
        throw new Error(allOrders);
      }
      const required = allOrders.find((order) => order.id === oid);
      if (!required) {
        throw new Error(`The order with ID ${oid} doesn´t exist.`);
      }
      this.orders = allOrders.filter((order) => order.id !== oid);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, 2)
      );
      return required;
    } catch (error) {
      return error.message;
    }
  }

  //Method to update an order of the .json
  async update(oid, quantity, state) {
    try {
      const allOrders = this.read();
      if (typeof allOrders === "string") {
        throw new Error(allOrders);
      }
      const required = allOrders.find((order) => order.id === oid);
      if (!required) {
        throw new Error(`The order with ID ${oid} doesn´t exist.`);
      }
      if (!quantity && !state) {
        throw new Error("Please, enter the new quantity or state.");
      }
      if (quantity && (isNaN(Number(quantity)) || quantity <= 0)) {
        throw new Error("The quantity must be a number higher than 0.");
      }
      quantity && (required.quantity = Number(quantity));
      state && (required.state = state);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, 2)
      );
      return required;
    } catch (error) {
      return error.message;
    }
  }
}

//Orders instance
const orders = new OrderManager("./src/data/fs/files/orders.json");

//Instance export
export default orders;
