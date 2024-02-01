import User from "./models/user.model.js";

class UserManager {
  async create(data) {
    try {
      const one = await User.create(data);
      return one._id;
    } catch (error) {
      return error.message;
    }
  }

  async read(obj) {
    try {
      const { filter, order } = obj;
      const all = await User.find(filter).sort(order);
      if (all.length === 0) {
        throw new Error("There are no users yet.");
      }
      return all;
    } catch (error) {
      return error.message;
    }
  }

  async readOne(id) {
    try {
      const one = await User.findById(id);
      if (!one) {
        throw new Error(`The user with the ID ${id} doesn´t exist.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async readByEmail(email) {
    try {
      const one = await User.findOne({ email: email });
      if (!one) {
        throw new Error(`The user with the email ${email} doesn´t exist.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const one = await User.findByIdAndDelete(id);
      if (!one) {
        throw new Error(`The user with the ID ${id} doesn´t exist.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }

  async update(id, data) {
    try {
      if(!data.name && !data.photo && !data.email) {
        throw new Error("Please, enter the new name, photo or email.");
      }
      const opt = { new: true };
      const one = await User.findByIdAndUpdate(id, data, opt);
      if (!one) {
        throw new Error(`The user with the ID ${id} doesn´t exist.`);
      }
      return one;
    } catch (error) {
      return error.message;
    }
  }
}

const users = new UserManager();

export default users;
