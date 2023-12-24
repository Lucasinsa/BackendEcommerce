# Challenge 3: Express server

## ¿How it works?

It consists of an express server that runs on port 8080 of localhost. When the server is powered on with npm run dev or npm start, HTTP GET verb requests can be made. Product and user data can be obtained, saved in fs (file system). You will get a json response.

## Available endpoints

- **/api/products/:** If products exist, a response with status 200 will be sent to the client along with an object with the properties {success: true, response: allProducts}. If they do not exist yet, a response with status 404 will be sent along with an object with the properties {success: false, message: "Not found!"}.

- **/api/products/:pid:** If the product with the requested id exists, a response with status 200 will be sent to the client along with an object with the properties {success: true, response: product}. If the product does not exist, a response with status 404 will be sent along with an object with the properties {success: false, message: "Not found!"}. The dynamic parameter :pid is the id of the product you want to obtain.


- **/api/users/:** If users exist, a response with status 200 will be sent to the client along with an object with the properties {success: true, response: allUsers}. If they do not exist yet, a response with status 404 will be sent along with an object with the properties {success: false, message: "Not found!"}.

- **/api/users/:uid:** If the user with the requested id exists, a response with status 200 will be sent to the client along with an object with the properties {success: true, response: user}. If the user does not exist, a response with status 404 will be sent along with an object with the properties {success: false, message: "Not found!"}. The dynamic parameter :uid is the id of the user you want to obtain.