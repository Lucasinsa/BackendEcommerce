# Challenge 2: File management

## ¿How it works?
It consists of two classes: ProductManager and UserManager, with their respective properties and methods for managing sets of products and users. ProductManager is instantiated in the constant "products" and UserManager in the constant "users". In addition, we work with a "data" folder where the products.json and users.json files are added to keep the information updated, reading them, overwriting them or creating them. Tests are carried out with both methods in the terminal.

## Constructor
The constructor receives as a parameter the path in which you want to store or read the product/user information in json format and calls the init method.

## Methods
-  **init():** Initialize the array of users/products, empty or recovering it from the json files. If the json file is not created, it creates it with an empty array.

- **create(data):** Receives an object as a parameter. In the case of ProductManager, it creates an object with the properties id, title, photo, price, stock. In the case of UserManager, create an object with the properties id, name, photo, email. In both cases, the id is automatically generated and must not be passed as a parameter. The created object is added to the "users" or "products" array and the corresponding json file is overwritten or created, with the updated array. It **returns** true if the product/user has been created successfully or an error message indicating that the object passed does not have all the requested properties.

- **read():** **Returns** the array of products or users created, or an error message if there are no products to read.

- **readOne(id):** It receives as a parameter the id of the desired product or user. **Returns** the object with that id. If it does not exist, it returns an error messaage.

- **destroy(id):** It receives as a parameter the id of the desired product or user to delete. Returns true if the product was deleted correctly or a string if there is an error.