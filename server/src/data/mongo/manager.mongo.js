import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import Order from "./models/order.model.js";
import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
    this.collectionName = this.model.collection.name;
    this.objectType = this.collectionName.slice(0, -1);
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      return error.message;
    }
  }

  async read({ filter, sortAndPaginate }) {
    try {
      const all = await this.model.paginate(filter, sortAndPaginate);
      if (all.totalDocs === 0) {
        throw new Error(`There are no ${this.collectionName} yet.`);
      }
      return all;
    } catch (error) {
      return error.message;
    }
  }

  async readOne(id) {
    try {
      let one = null;
      if (this.collectionName === "orders") {
        const filter = { uid: id };
        one = await this.model.find(filter);
        if (!one || (Array.isArray(one) && one.length === 0)) {
          throw new Error(
            `The ${this.objectType} with the ID ${id} doesn´t exist.`
          );
        }
      } else {
        one = await this.model.findById(id);
        if (!one) {
          throw new Error(
            `The ${this.objectType} with the ID ${id} doesn´t exist.`
          );
        }
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      if (!one) {
        throw new Error(
          `The ${this.objectType} with the ID ${id} doesn´t exist.`
        );
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      if (!one) {
        throw new Error(
          `The ${this.objectType} with the ID ${id} doesn´t exist.`
        );
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email: email });
      if (!one) {
        throw new Error(
          `The ${this.objectType} with the email ${email} doesn´t exist.`
        );
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async report(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { uid: new Types.ObjectId(uid) } },
        {
          $lookup: {
            foreignField: "_id",
            from: "products",
            localField: "pid",
            as: "pid",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$pid", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },
        { $group: { _id: "$uid", total: { $sum: "$subTotal" } } },
        {
          $project: { _id: 0, uid: "$_id", total: "$total", date: new Date() },
        },
      ]);
      return report;
    } catch (error) {
      return error.message;
    }
  }
}

const products = new MongoManager(Product);
const users = new MongoManager(User);
const orders = new MongoManager(Order);

export { products, users, orders };
