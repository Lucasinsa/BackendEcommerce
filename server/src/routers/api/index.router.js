import CustomRouter from "../CustomRouter.js";
import passCallBack from "../../middlewares/passCallBack.js";
import UsersRouter from "./users.router.js";
import OrdersRouter from "./orders.router.js";
import SessionsRouter from "./sessions.router.js";
import ClothesRouter from "./clothes.router.js";
import CategoriesRouter from "./categories.router.js";
import SizesRouter from "./sizes.router.js";

const clothes = new ClothesRouter()
const categories = new CategoriesRouter()
const sizes = new SizesRouter()
const users = new UsersRouter()
const orders = new OrdersRouter()
const sessions = new SessionsRouter()

const clothesRouter = clothes.getRouter()
const categoriesRouter = categories.getRouter()
const sizesRouter = sizes.getRouter()
const usersRouter = users.getRouter()
const ordersRouter = orders.getRouter()
const sessionsRouter = sessions.getRouter()

export default class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/clothes", passCallBack("jwt"), clothesRouter);
    this.router.use("/categories", passCallBack("jwt"), categoriesRouter);
    this.router.use("/sizes", passCallBack("jwt"), sizesRouter);
    this.router.use("/users", usersRouter);
    this.router.use("/orders", passCallBack("jwt"), ordersRouter);
    this.router.use("/sessions", sessionsRouter);
  }
}
