import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";

const schema = new Schema(
  {
    cid: { type: Types.ObjectId, required: true, ref: "clothes" },
    uid: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      enum: ["reserved", "payed", "delivered"],
      default: "reserved",
      index: 1
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate)

schema.pre("find",function(){this.populate("cid")})
schema.pre("find",function(){this.populate("uid")})

const Order = model(collection, schema);

export default Order;
