import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true, unique: true, index: 1},
    photo: { type: String, required: true },
    price: { type: Number, required: true, index: 1},
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate)

const Product = model(collection, schema);

export default Product;
