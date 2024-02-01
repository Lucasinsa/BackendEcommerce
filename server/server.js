import "dotenv/config.js";
import express from "express";
import __dirname from "./utils.js";
import dbConnection from "./src/utils/dbConnection.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import socketUtils from "./src/utils/socket.utils.js";

//I create and start the express server
const server = express();
const PORT = process.env.PORT || 8080;
const ready = ()=> {
    console.log(`Server ready on PORT ${PORT}.`);
    dbConnection();
}
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

//Template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
