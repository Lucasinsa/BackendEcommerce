# Sprint 8: Custom Router

## ¿How it works?

It consists of an application that uses Express to configure a server on port 8080. When the server is powered on with npm run dev or npm start, HTTP POST, GET, PUT and DELETE verbs requests can be made. The connection to the database with moongose ​​begins. All the responses of the API follows the rules of a REST API. Clothe, category, size, user and order data can be obtained, saved in MongoDB database. You will get a json response. Additionally, you can access 4 views rendered by Handlebars: home, form, orders, register and log in, depending on your role.

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

### LOGGED IN USERS ("PREMIUM" ROLE)

- **Form**: shows a form to create a product in the Mongo database. Once created, or not, it is informed by an alert().
- **Orders**: shows all the orders of the logged in user. The uid is destructured from the encrypted object in the token.

## New endpoints

### Categories

- **POST /api/categories**: Allows you to create a category that will be saved in the Mongo database. Requires category.

- **GET /api/categories**: Allows you to read the all the categories that are saved in the Mongo database.

- **GET /api/categories/:id**: Allows you to read one categorie that is saved in the Mongo database.

- **PUT /api/categories/:id**: Allows you to update  one category that is saved in the Mongo database.

- **DELETE /api/categories/:id**: Allows you to delete one category that is saved in the Mongo database.

### Sizes

- **POST /api/sizes**: Allows you to create a size that will be saved in the Mongo database. Requires size.

- **GET /api/sizes**: Allows you to read the all the sizes that are saved in the Mongo database.

- **GET /api/sizes/:id**: Allows you to read one size that is saved in the Mongo database.

- **PUT /api/sizes/:id**: Allows you to update one category that is saved in the Mongo database.

- **DELETE /api/sizes/:id**: Allows you to delete one size that is saved in the Mongo database.

### Clothes

- **POST /api/clothes**: Allows you to create a clothe that will be saved in the Mongo database. Requires name, photo, size_id, category_id and price. The user id is in req.user.id.

- **GET /api/clothes**: Allows you to read the all the clothes that are saved in the Mongo database.

- **GET /api/clothes/:id**: Allows you to read one clothe that is saved in the Mongo database.

- **PUT /api/clothes/:id**: Allows you to update one clothe that is saved in the Mongo database.

- **DELETE /api/clothes/:id**: Allows you to delete one clothe that is saved in the Mongo database.