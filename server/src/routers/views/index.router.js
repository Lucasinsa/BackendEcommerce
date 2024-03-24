import CustomRouter from "../CustomRouter.js";
// import { products } from "../../data/mongo/manager.mongo.js";
import { clothes } from "../../data/mongo/manager.mongo.js";
import { verifyToken } from "../../utils/token.utils.js";
import FormRouter from "./form.router.js";
import AuthRouter from "./auth.router.js";
import OrdersRouter from "./orders.router.js";

const form = new FormRouter();
const auth = new AuthRouter();
const orders = new OrdersRouter();

const formRouter = form.getRouter();
const authRouter = auth.getRouter();
const ordersRouter = orders.getRouter();

export default class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/form", formRouter);
    this.router.use("/auth", authRouter);
    this.router.use("/orders", ordersRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const filter = {};
        req.query.name &&
          (filter.name = new RegExp(req.query.name.trim(), "i"));
        const sortAndPaginate = {
          limit: req.query.limit || 4,
          page: req.query.page || 1,
        };
        let isLoggedIn = false;
        let isAdmin = false;
        let isPremium = false;
        try {
          const user = verifyToken(req);
          isLoggedIn = true;
          if (user.role === 1) isAdmin = true;
          if (user.role === 2) isPremium = true;
        } catch (error) {}
        try {
          const allProducts = await clothes.read({ filter, sortAndPaginate });
          const productsCopy = allProducts.docs.map((doc) => ({
            photo: doc.photo,
            name: doc.name,
            price: doc.price,
          }));
          return res.render("index", {
            products: productsCopy,
            title: "Insawear | HOME",
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            isPremium: isPremium,
            filter: req.query.name,
            next: allProducts.nextPage,
            prev: allProducts.prevPage,
          });
        } catch (error) {
          return res.render("index", {
            noProducts: error.message,
            title: "Insawear | HOME",
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            isPremium: isPremium,
          });
        }
      } catch (error) {
        next(error);
      }
    });
  }
}
