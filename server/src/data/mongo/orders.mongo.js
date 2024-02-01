import Order from "./models/order.model.js";

class OrderManager {
  async create(data) {
    try {
      if (isNaN(Number(data.quantity)) || data.quantity <= 0) {
        throw new Error("The quantity must be a number higher than 0.");
      }
      const one = await Order.create(data);
      return one._id;
    } catch (error) {
      return error.message;
    }
  }

  async read(obj) {
    try {
      const { filter, order } = obj;
      const all = await Order.find(filter).sort(order);
      if (all.length === 0) {
        throw new Error("There are no orders yet.");
      }
      return all;
    } catch (error) {
      return error.message;
    }
  }

  async readOne(uid) {
    try {
      const filter = { uid: uid };
      const one = await Order.find(filter);
      if (!one || (Array.isArray(one)) && one.length === 0) {
        throw new Error(`The user with the ID ${uid} doesn´t have orders yet.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async destroy(oid) {
    try {
      const one = await Order.findByIdAndDelete(oid);
      if (!one) {
        throw new Error(`The order with the ID ${oid} doesn´t exist.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async update(oid, quantity, state) {
    try {
      if (!quantity && !state) {
        throw new Error(`Please, enter the new quantity or state.`);
      }
      if (quantity && (isNaN(Number(quantity)) || quantity <= 0)) {
        throw new Error("The quantity must be a number higher than 0.");
      }
      const data = { quantity, state };
      const opt = { new: true };
      const one = await Order.findByIdAndUpdate(oid, data, opt);
      if (!one) {
        throw new Error(`The order with the ID ${oid} doesn´t exist.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }
}

const orders = new OrderManager();

export default orders;
