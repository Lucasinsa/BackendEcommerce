import express from "express";
import __dirname from "./utils.js";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";

//I create express server
const server = express();

const PORT = 8080;

//I start the server
server.listen(PORT, () => {
  console.log(`Server ready on PORT ${PORT}.`);
});

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
