# Challenge 1: Advanced EcmaScript

## ¿How it works?
It consists of two classes: ProductManager and UserManager, with their respective properties and methods for managing sets of products and users. ProductManager is instantiated in the constant "products" and UserManager in the constant "users". Tests are carried out with both methods in the terminal.

## Methods
- **create(data):** Receives an object as a parameter. In the case of ProductManager, it creates an object with the properties id, title, photo, price, stock. In the case of UserManager, create an object with the properties id, name, photo, email. In both cases, the id is automatically generated and must not be passed as a parameter. The created object is added to the internal "users" or "products" array. Returns a boolean true if the product was created correctly or a string if there is an error.

- **read():** Returns the array of products or users created or a string if there is an error.

- **readOne(id):** It receives as a parameter the id of the desired product or user. Returns the object with that id. If it does not exist, it returns a string indicating the error.

- **destroy(id):** It receives as a parameter the id of the desired product or user to delete. Returns true if the product was deleted correctly or a string if there is an error.