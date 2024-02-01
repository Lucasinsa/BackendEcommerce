import crypto from "crypto";

class UserManager {
  //Static and private variable
  static #users = [];

  //Methods
  create(data) {
    try {
      const { name, photo, email } = data;
      if(!name || !photo || !email ) {
        throw new Error("Please, enter a valid name, photo and email.");
      }
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: name,
        photo: photo,
        email: email,
      };
      UserManager.#users.push(user);
      return user;
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("There are no users yet.");
      }
      return UserManager.#users;
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const allUsers = this.read();
      if (typeof allUsers === "string") {
        throw new Error(allUsers);
      }
      const required = allUsers.find((user) => user.id === id);
      if (!required) {
        throw new Error(`The user with the ID ${id} doesn´t exist.`);
      }
      return required;
    } catch (error) {
      return error.message;
    }
  }

  readByEmail(email) {
    try {
      const allUsers = this.read();
      if (typeof allUsers === "string") {
        throw new Error(allUsers);
      }
      const one = allUsers.find((user) => user.email === email);
      if (!one) {
        throw new Error(`The user with the email ${email} doesn´t exist.`);
      }
      return one
    } catch (error) {
      return error.message 
    }
  }

  destroy(id) {
    try {
      const required = this.readOne(id);
      if (typeof required === "string") {
        throw new Error(required);
      }
      UserManager.#users = UserManager.#users.filter((each) => each.id !== id);
      return true;
    } catch (error) {
      return error.message;
    }
  }

  update(id, data) {
    try {
      const required = this.readOne(id)
      if(typeof required === "string") {
        throw new Error(required)
      }
      const { name, photo, email } = data;
      if (!name && !photo && !email) {
        throw new Error("Please, enter the new name, photo, or email.");
      }
      name && (required.name = name)
      photo && (required.photo = photo)
      email && (required.email = email)
      return required
    } catch (error) {
      return error.message
    }
  }
}

//Users instance
const usersMemory = new UserManager();

//Instance export
export default usersMemory;