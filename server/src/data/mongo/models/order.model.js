import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
      index: 1
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate)

schema.pre("find",function(){this.populate("pid")})
schema.pre("find",function(){this.populate("uid")})

const Order = model(collection, schema);

export default Order;
