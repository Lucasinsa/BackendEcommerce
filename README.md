# Challenge 5: Websockets + Handlebars

## ¿How it works?

It consists of an application that uses Express to configure an HTTP server and Socket.io to enable real-time communication over WebSocket (TCP protocol), on port 8080. When the server is powered on with npm run dev or npm start, HTTP POST, GET, PUT and DELETE verbs requests can be made. All the responses of the API follows the rules of a REST API. Product, user and order data can be obtained, saved in fs (file system). You will get a json response. Additionally, you can access 4 views rendered by Handlebars: home, real, form and register.

## New available endpoints

### Home
- **GET /:**  Shows the home page of the e-commerce and all the available products. Product updates are not in real time.

### Real
- **GET /real:**  Shows all the available products. Product updates are in real time.

### Form
- **GET /form:**  Allows you to create products that will later be saved in file system.

### Register
- **GET /register:**  It shows a registration form that is not yet functional.

