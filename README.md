# Sprint 7: Refactoring

## ¿How it works?

It consists of an application that uses Express to configure a server on port 8080. When the server is powered on with npm run dev or npm start, HTTP POST, GET, PUT and DELETE verbs requests can be made. The connection to the database with moongose ​​begins. All the responses of the API follows the rules of a REST API. Product, user and order data can be obtained, saved in MongoDB database. You will get a json response. Additionally, you can access 4 views rendered by Handlebars: home, form, orders, register and log in, depending on your role.

## Views

### GENERAL

- **Home**: show all products applying pagination and search bar.

### NON LOGGED IN USERS

- **Register**: shows a register form. The server, using the register strategy, verifies that the email does not exist in the Mongo database, that the password has at least 8 characters, and that all fields are filled out. If any condition is not met, the user is informed using alert(). If yes, the user is informed, the user is created in the database and the user is redirected to "/auth/login".

- **Log In**: shows a login form. The server, using the login strategy, verifies that the email exists in the Mongo database and that the password is correct. If the authentication is not successful, it is informed by means of an "alert()". If yes, the user is informed and a cookie is created with the generated token, to be able to access it in each request, using the req object. Redirects to "/".

### LOGGED IN USERS ("USER" ROLE)

- **Orders**: shows all the orders of the logged in user. The uid is destructured from the encrypted object in the token.

### LOGGED IN USERS ("ADMIN" ROLE)

- **Form**: shows a form to create a product in the Mongo database. Once created, or not, it is informed by an alert().

## Modified endpoints

- **POST /api/sessions/register**: Allows you to create a user that will be saved in the Mongo database. Requires name, photo, email and password. The password must contain at least 8 characters. User is created using local registration passport strategy.

- **POST /api/sessions/login**: Allows a user who is already in the database to log in, using local login passport strategy. Once the login is accepted, a cookie is created with the encrypted token (which contains the user's email, role and uid).

- **POST /api/sessions/signout**: Allows you to close the current session, as long as it is open. 
Verifies the existence and validity of the current token. If it exists, the cookie with the token is deleted, therefore the session is closed.

- **POST /api/sessions/google**: Get google credentials.

- **POST /api/sessions/google/cb**: Execute the google passport strategy. If the user does not exist in the database, it is created and logged in. The cookie is filled with the token.

- **POST /api/sessions/github**: Get github credentials.

- **POST /api/sessions/github/cb**: Execute the github passport strategy. If the user does not exist in the database, it is created and logged in. The cookie is filled with the token.