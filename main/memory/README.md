# Challenge 1: Advanced EcmaScript

## ¿How it works?
It consists of two classes: ProductManager and UserManager, with their respective properties and methods for managing sets of products and users. ProductManager is instantiated in the constant "products" and UserManager in the constant "users". Tests are carried out with both methods in the terminal.

## Methods
- **create(data):** Receives an object as a parameter. In the case of ProductManager, it creates an object with the properties id, title, photo, price, stock. In the case of UserManager, create an object with the properties id, name, photo, email. In both cases, the id is automatically generated and must not be passed as a parameter. The created object is added to the internal "users" or "products" array. It returns an object with a message indicating that the product or user has been created.

- **read():** Returns the array of products or users created.

- **readOne(id):** It receives as a parameter the id of the desired product or user. Returns the object with that id. If it does not exist, an object is returned with a message indicating that it does not exist.