const fs = require("fs");

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
  create(data) {
    try {
      const { name, photo, email } = data;
      if (!name || !photo || !email ) {
        throw new Error("Please enter name, photo and email.");
      }
      const user = {
        id: this.users.length + 1,
        name: name,
        photo: photo,
        email: email
      };
      this.users.push(user);
      fs.writeFileSync(this.path, JSON.stringify(this.users, null, 2));
      return true;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read all users of the .json
  async read() {
    try {
      const dataJSON = await fs.promises.readFile(
        this.path,
        this.configuration
      );
      const data = JSON.parse(dataJSON);
      if (!Array.isArray(data)) {
        throw new Error(`The content of the .json is not an array.`);
      }
      if (data.length === 0) {
        throw new Error("There are no users yet.");
      }
      return data;
    } catch (error) {
      return error.message;
    }
  }

  //Method to read one user of the .json
  async readOne(id) {
    try {
      const data = await this.read();
      if (typeof data === "object") {
        const one = data.find((each) => each.id === Number(id));
        if (!one) {
          throw new Error(`The user with the ID ${id} doesn´t exist.`);
        }
        return one;
      } else {
        throw new Error(data);
      }
    } catch (error) {
      return error.message;
    }
  }
}

//Testing
const users = new UserManager("./data/users.json");

const main = async () => {
  console.log("----- First users read -----");
  console.log(await users.read());
  console.log("----- I try to pass as argument an object without all properties -----");
  console.log(users.create({ name: "Lucas" }));
  console.log("----- I create users -----");
  console.log(users.create({name: "Lucas", photo: "url", email: "lukitasinsa7@gmail.com"}));
  console.log(users.create({name: "Pablo", photo: "url", email: "pablo@gmail.com"}));
  console.log("----- Second users read -----");
  console.log(await users.read());
  console.log("----- I read user with ID 1 -----");
  console.log(await users.readOne(1));
  console.log("----- I read user with ID 34532 -----");
  console.log(await users.readOne(34532));
};

main();
