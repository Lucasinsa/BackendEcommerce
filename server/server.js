import express from "express"
import products from "./data/fs/products.fs.js"
import users from "./data/fs/users.fs.js"

//I create express server
const server = express()

//Middleware for complex url data 
server.use(express.urlencoded({extended:true}))

const PORT = 8080

//I start the server
server.listen(PORT, () => {
    console.log(`Server ready on PORT ${PORT}.`);
})

//GET request to see all the products
server.get("/api/products",(req, res) => {
    try {
        const allProducts = products.read()
        if(typeof allProducts === "string") {
            throw new Error(allProducts)
        }
        return res.status(200).json({
            success: true,
            response: allProducts
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Not found!"
        })
    }
})

//GET request to see one product
server.get("/api/products/:pid", (req,res) => {
    try {
        const { pid } = req.params
        const one = products.readOne(pid)
        if(typeof one === "string") {
            throw new Error(one)
        }
        return res.status(200).json({
            success: true,
            response: one
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Not found!"
        })
    }
})

//GET request to see all the users
server.get("/api/users", (req, res) => {
    try {
        const allUsers = users.read()
        if(typeof allUsers === "string") {
            throw new Error(allUsers)
        }
        return res.status(200).json({
            success: true,
            response: allUsers
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Not found!"
        })
    }
})

//GET request to see one user
server.get("/api/users/:uid", (req,res) => {
    try {
        const { uid } = req.params
        const one = users.readOne(uid)
        if(typeof one === "string") {
            throw new Error(one)
        }
        return res.status(200).json({
            success: true,
            response: one
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Not found!"
        })
    }
})