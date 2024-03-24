import "dotenv/config.js";
import express from "express";
import __dirname from "./utils.js";
import dbConnection from "./src/utils/dbConnection.js";
import { engine } from "express-handlebars";
import morgan from "morgan";
import expressSession from "express-session";
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo";
import IndexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";

//I create and start the express server
const server = express();
const PORT = process.env.PORT || 8080;
const ready = () => {
  console.log(`Server ready on PORT ${PORT}.`);
  dbConnection();
};
server.listen(PORT, ready);

//Template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Middlewares
server.use(cookieParser(process.env.SECRET_KEY))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
//Memory store
// server.use(
//   expressSession({
//     secret: process.env.SECRET_KEY,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 },
//   })
// );
//File storage
// const FileStore = sessionFileStore(expressSession);
// server.use(
//   expressSession({
//     secret: process.env.SECRET_KEY,
//     resave: true,
//     saveUninitialized: true,
//     store: new FileStore({
//       path: "./src/data/fs/files/sessions",
//       ttl: 10,
//       retries: 2,
//     }),
//   })
// );
//Mongo storage
// server.use(
//   expressSession({
//     secret: process.env.SECRET_KEY,
//     resave: true,
//     saveUninitialized: true,
//     store: new MongoStore({ mongoUrl: process.env.DB_LINK, ttl: 60 * 60 * 24 * 7})
//   })
// )
const router = new IndexRouter()
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);
