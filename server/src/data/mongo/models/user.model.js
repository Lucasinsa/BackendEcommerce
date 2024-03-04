import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

const schema = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: 1 },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user"}
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate)

const User = model(collection, schema);

export default User;
