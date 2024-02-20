import { users } from "../data/mongo/manager.mongo.js";

async function isValidPass(email, password) {
  const one = await users.readByEmail(email);
  if (password !== one.password) {
    console.log(one.password);
    const error = new Error("Bad auth.");
    error.statusCode = 401;
    throw error;
  }
}

export default isValidPass;
