# Pre-delivery 1: Express server

## ¿How it works?

It consists of an express server that runs on port 8080 of localhost. When the server is powered on with npm run dev or npm start, HTTP POST, GET, PUT and DELETE verbs requests can be made. All the responses of the API follows the rules of a REST API. Product, user and order data can be obtained, saved in fs (file system). You will get a json response.

## Available endpoints

### Api products
- **POST /api/products/:** Use create(data) method of ProductManager in fs. Returns a json with a statusCode and response. The statusCode is 400 if the data that the user enters isn´t valid, and the response is a string indicating that error. The status code is 201 if the product creates successfully and the response is the product created. There may be other statusCodes related to errors on the server, such as 500.

- **GET /api/products/:** Use read() method of ProductManager in fs. Returns a json with a statusCode and response. The statusCode is 404 if there are no products, and the response is a string indicating that error. The status code is 200 if there are products and the response is an array with the products. There may be other statusCodes related to errors on the server, such as 500.

- **GET /api/products/:pid:** Use readOne(id) method of ProductManager in fs. Returns a json with a statusCode and response. The statusCode is 404 if there are no products or the required product doesn´t exist, and the response is a string indicating that error. The status code is 200 if the product exists and the response is the required product. There may be other statusCodes related to errors on the server, such as 500.

- **PUT /api/users/:pid:** Use update(id,data) method of ProductManager in fs. Returns a json with a statusCode and response. The statusCode is 404 if there are no products or the required product doesn´t exist, and the response is a string indicating that error. The status code is 400 if the new data isn´t valid, and the response is a string indicating that error.The status code is 200 if the required product updates successfully and the response is the required product. There may be other statusCodes related to errors on the server, such as 500.

- **DELETE /api/users/:uid:** Use destroy(id) method of ProductManager in fs. Returns a json with a statusCode and response. The statusCode is 404 if there are no products or the required product doesn´t exist, and the response is a string indicating that error. The status code is 200 if the product deletes successfuly and the response is the deleted product. There may be other statusCodes related to errors on the server, such as 500.

### Api users
- **POST /api/users/:** Use create(data) method of UserManager in fs. Returns a json with a statusCode and response. The statusCode is 400 if the data that the user enters isn´t valid, and the response is a string indicating that error. The status code is 201 if the user creates successfully and the response is the user created. There may be other statusCodes related to errors on the server, such as 500.

- **GET /api/users/:** Use read() method of UserManager in fs. Returns a json with a statusCode and response. The statusCode is 404 if there are no users, and the response is a string indicating that error. The status code is 200 if there are users and the response is an array with the users. There may be other statusCodes related to errors on the server, such as 500.

- **GET /api/products/:uid:** Use readOne(id) method of UserManager in fs. Returns a json with a statusCode and response. The statusCode is 404 if there are no users or the required user doesn´t exist, and the response is a string indicating that error. The status code is 200 if the user exists and the response is the required user. There may be other statusCodes related to errors on the server, such as 500.

### Api orders
- **POST /api/orders/:** Use create(data) method of OrderManager in fs. Returns a json with a statusCode and response. The statusCode is 400 if the data that the user enters isn´t valid, and the response is a string indicating that error. The status code is 201 if the order creates successfully and the response is the order created. There may be other statusCodes related to errors on the server, such as 500.

- **GET /api/orders/:uid:** Use readOne(uid) method of OrderManager in fs. Returns a json with a statusCode and response. The statusCode is 404 if there are no orders or there are no orders with the requested id, and the response is a string indicating that error. The status code is 200 if there are orders with the requested user id and the response is an array with the orders of the requested user. There may be other statusCodes related to errors on the server, such as 500.

- **DELETE /api/orders/:oid:** Use destroy(oid) method of OrderManager in fs. Returns a json with a statusCode and response. The statusCode is 404 if there are no orders or the required order doesn´t exist, and the response is a string indicating that error. The status code is 200 if the order deletes successfuly and the response is the deleted order. There may be other statusCodes related to errors on the server, such as 500.