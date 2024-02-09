# Challenge 2: Advanced Mongo

## ¿How it works?

It consists of an application that uses Express to configure an HTTP server and Socket.io to enable real-time communication over WebSocket (TCP protocol), on port 8080. When the server is powered on with npm run dev or npm start, HTTP POST, GET, PUT and DELETE verbs requests can be made. The connection to the database with moongose ​​begins. All the responses of the API follows the rules of a REST API. Product, user and order data can be obtained, saved in MongoDB database. You will get a json response. Additionally, you can access 4 views rendered by Handlebars: home, real, form and register.

## Available API endpoints

### PRODUCTS

- **POST /api/products**: Creates a product and saves it to the database. Receives through req.body the product you want to create, with the properties title, photo, price and stock. Additionally, you need to add a "role" property with the value "admin".

- **GET /api/products**: Returns all products found in the database. You can add two queries to the query. The filter "?price=value" so that only products with a price higher than the one entered are returned. The order "?order=value" to sort the titles alphabetically.

- **GET /api/products/:pid**: Returns the product with the required id in the req.params.

- **PUT /api/products/:pid**: Update the product with the requested id via req.params. Requires, minimally, an object sent by req.body with at least one of these properties: title, photo, price, stock. Additionally, the "role":"admin" property must be added.
 
- **DELETE /api/products/:pid**: Deletes the product with the required id via req.params.

### USERS

- **POST /api/users**: Creates an user and saves it to the database. Receives through req.body the user you want to create, with the properties email, name and photo. Additionally, you need to add a "role" property with the value "admin".

- **GET /api/users**: Returns all users found in the database. You can add two queries to the query. The filter "?name=value" so that only users with the required name are returned. The order "?order=value" to sort the names alphabetically.

- **GET /api/users/:uid**: Returns the user with the required id in the req.params.

- **PUT /api/users/:uid**: Update the user with the requested id via req.params. Requires, minimally, an object sent by req.body with at least one of these properties: name, photo, email. Additionally, the "role":"admin" property must be added.
 
- **DELETE /api/users/:uid**: Deletes the user with the required id via req.params.

### ORDERS

- **POST /api/orders**: Creates an order and saves it to the database. Receives through req.body the product you want to create, with the properties pid, uid, quantity and state. Additionally, you need to add a "role" property with the value "admin".

- **GET /api/orders**: Returns all orders found in the database. You can add two queries to the query. The filter "?state=value" so that only orders with the required state are returned. The order "?order=value" to sort the orders by quantity.

- **GET /api/orders/:uid**: Returns all the orders of the user with the required id in the req.params.

- **GET /api/orders/total/:uid**: Returns the total amount of an user.

- **PUT /api/orders/:oid**: Update the order with the requested id via req.params. Requires, minimally, an object sent by req.body with at least one of these properties: quantity or state. Additionally, the "role":"admin" property must be added.
 
- **DELETE /api/orders/:oid**: Deletes the order with the required id via req.params. 


