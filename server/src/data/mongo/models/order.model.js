import { model, Schema, Types } from "mongoose";

const collection = "orders";

const schema = new Schema(
  {
    pid: { type: Types.ObjectId, required: true, ref: "products" },
    uid: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, required: true },
    state: {
      type: String,
      required: true,
      enum: ["reserved", "payed", "delivered"],
    },
  },
  { timestamps: true }
);

const Order = model(collection, schema);

export default Order;
