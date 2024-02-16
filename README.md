# Sprint 6: Session implementation

## ¿How it works?

It consists of an application that uses Express to configure a server on port 8080. When the server is powered on with npm run dev or npm start, HTTP POST, GET, PUT and DELETE verbs requests can be made. The connection to the database with moongose ​​begins. All the responses of the API follows the rules of a REST API. Product, user and order data can be obtained, saved in MongoDB database. You will get a json response. Additionally, you can access 4 views rendered by Handlebars: home, form, register and log in.

## New view

- **LOG IN**: shows a login form.

## New endpoints

- **POST /api/sessions/register**: Allows you to create a user that will be saved in the Mongo database. Requires name, photo, email and password. The password must contain at least 8 characters. 

- **POST /api/sessions/login**: Allows a user who is already in the database to log in. Once the login is accepted, the session has the properties "email" and "role:admin" (for the moment) and expires after 20 seconds.

- **POST /api/sessions/signout**: Allows you to close the current session, as long as it is open.