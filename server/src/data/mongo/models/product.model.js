import { model, Schema } from "mongoose";

const collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = model(collection, schema);

export default Product;
