import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

const schema = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: 1},
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate)

const User = model(collection, schema);

export default User;
