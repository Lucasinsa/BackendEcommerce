import fs from "fs";
import crypto from "crypto";

//Class for user management
class UserManager {
  constructor(path) {
    this.configuration = "utf-8";
    this.path = path;
    this.users = [];
    this.init();
  }

  //Method to initialize the array or .json
  init() {
    fs.existsSync(this.path)
      ? (this.users = JSON.parse(
          fs.readFileSync(this.path, this.configuration)
        ))
      : fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    return true;
  }

  //Method to create an user and add it to the .json
  async create(data) {
    try {
      const { name, photo, email } = data;
      if (!name || !photo || !email) {
        throw new Error("Please enter name, photo and email.");
      }
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: name,
        photo: photo,
        email: email,
      };
      this.users.push(user);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, 2)
      );
      return user;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read all users of the .json
  read() {
    try {
      if (this.users.length === 0) {
        throw new Error("There are no users yet.");
      }
      return this.users;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read one user of the .json
  readOne(id) {
    try {
      const allUsers = this.read();
      if (typeof allUsers === "string") {
        throw new Error(allUsers);
      }
      const required = allUsers.find((each) => each.id === id);
      if (!required) {
        throw new Error(`The user with the ID ${id} doesn´t exist.`);
      }
      return required;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read one user by email
  readByEmail(email) {
    try {
      const allUsers = this.read();
      if (typeof allUsers === "string") {
        throw new Error(allUsers);
      }
      const required = allUsers.find((each) => each.email === email);
      if (!required) {
        throw new Error(`The user with the email ${email} doesn´t exist.`);
      }
      return required;
    } catch (error) {
      return error.message;
    }
  }

  //Method to delete an user of the .json
  async destroy(id) {
    try {
      const required = this.readOne(id);
      if (typeof required === "string") {
        throw new Error(required);
      }
      this.users = this.users.filter((each) => each.id !== id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, 2)
      );
      return true;
    } catch (error) {
      return error.message;
    }
  }

  //Method to update a product of the .json
  async update(id, data) {
    try {
      const required = this.readOne(id);
      if (typeof required === "string") {
        throw new Error(required);
      }
      const { name, photo, email } = data;
      if (!name && !photo && !email) {
        throw new Error("Please, enter the new name, photo or email.");
      }
      name && (required.name = name);
      photo && (required.photo = photo);
      email && (required.email = email);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, 2)
      );
      return required;
    } catch (error) {
      return error.message;
    }
  }
}

//Users instance
const users = new UserManager("./src/data/fs/files/users.json");

//Instance export
export default users;
