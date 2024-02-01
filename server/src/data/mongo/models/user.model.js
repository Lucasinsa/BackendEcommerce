import { model, Schema } from "mongoose";

const collection = "users";

const schema = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const User = model(collection, schema);

export default User;
