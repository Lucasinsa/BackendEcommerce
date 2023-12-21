//User manager class
class UserManager {
    //Static and private variable
    static #users = []

    //Methods
    create(data) {
        const user = {
            id: UserManager.#users.length + 1,
            name: data.name,
            photo: data.photo,
            email: data.email
        }
        UserManager.#users.push(user)
        return {message: "User created and added to the array."}
    }

    read() {
        return UserManager.#users
    }

    readOne(id) {
        const required = this.read().find(user => user.id === id)
        return (required ? required : {message: `User with id = ${id} does not exist.`})
    }
}

//Users instance
const users = new UserManager()

users.create({
    name: "Lucas Insaurralde Sousa",
    photo: "Link",
    email: "lukitasinsa7@gmail.com",
})

users.create({
    name: "Juan perez",
    photo: "Link",
    email: "jperez@gmail.com",
})

users.create({
    name: "Julián Lopez",
    photo: "Link",
    email: "jlopez23@gmail.com",
})

console.log("------Users array------")
console.log(users.read())
console.log("------User with id = 2------")
console.log(users.readOne(2))
console.log("------User with id = 3------")
console.log(users.readOne(3))
console.log("------User with id = 30------")
console.log(users.readOne(30))