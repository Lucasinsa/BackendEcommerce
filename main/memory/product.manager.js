//Product manager class
class ProductManager {
    //Static and private variable
    static #products = []

    //Methods
    create(data) {
        const product = {
            id: ProductManager.#products.length + 1,
            title: data.title,
            photo: data.photo,
            price: Number(data.price),
            stock: Number(data.stock)
        }
        ProductManager.#products.push(product)
        return {message: "Product created and added to the array."}
    }

    read() {
        return ProductManager.#products
    }

    readOne(id) {
        const required = this.read().find(product => product.id === id)
        return (required ? required : {message: `Product with id = ${id} does not exist.`})
    }
}

//Products instance
const products = new ProductManager()

//Products methods test
products.create({
    title: "Remera roja",
    photo: "Link",
    price: 200,
    stock: 50
})

products.create({
    title: "Remera verde",
    photo: "Link",
    price: 100,
    stock: 40
})

products.create({
    title: "Remera amarilla",
    photo: "Link",
    price: 50,
    stock: 30
})

console.log("------Products array------")
console.log(products.read())
console.log("------Product with id = 2------")
console.log(products.readOne(2))
console.log("------Product with id = 3------")
console.log(products.readOne(3))
console.log("------Product with id = 30------")
console.log(products.readOne(30))