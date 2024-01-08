import crypto from "crypto";

class OrderManager {
  //Static and private variable
  static #orders = [];

  //Methods
  create(data) {
    try {
      const { pid, uid, quantity, state } = data;
      if (!pid || !uid || !quantity || !state) {
        throw new Error("Please, enter pid, uid, quantity and state.");
      }
      if(typeof pid !== "string" || typeof uid !== "string") {
        throw new Error("The pid and uid must be a string.")
      }
      if(isNaN(Number(quantity)) || quantity <= 0) {
        throw new Error("The quantity must be a number higher than 0.");
      }
      const order = {
        id: crypto.randomBytes(12).toString("hex"),
        pid: pid,
        uid: uid,
        quantity: Number(quantity),
        state: state,
      };
      OrderManager.#orders.push(order);
      return order;
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (OrderManager.#orders.length === 0) {
        throw new Error("There are no orders yet.");
      }
      return OrderManager.#orders;
    } catch (error) {
      return error.message;
    }
  }

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

  destroy(oid) {
    try {
      const allOrders = this.read();
      if (typeof allOrders === "string") {
        throw new Error(allOrders);
      }
      const required = allOrders.find((order) => order.id === oid);
      if (!required) {
        throw new Error(`The order with ID ${oid} doesn´t exist.`);
      }
      OrderManager.#orders = allOrders.filter((order) => order.id !== oid);
      return required;
    } catch (error) {
      return error.message;
    }
  }

  update(oid, quantity, state) {
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
      if(quantity && (isNaN(Number(quantity)) || quantity <= 0)) {
        throw new Error("The quantity must be a number higher than 0.");
      }
      quantity && (required.quantity = Number(quantity));
      state && (required.state = state);
      return required;
    } catch (error) {
      return error.message;
    }
  }
}

//Products instance
const ordersMemory = new OrderManager();

//Instance export
export default ordersMemory;
