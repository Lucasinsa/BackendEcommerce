import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import formRouter from "./form.router.js";
import authRouter from "./auth.router.js";
import ordersRouter from "./orders.router.js";
import { verifyToken } from "../../utils/token.utils.js";
const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    req.query.title && (filter.title = new RegExp(req.query.title.trim(), "i"));
    const sortAndPaginate = {
      limit: req.query.limit || 4,
      page: req.query.page || 1,
      sort: { price: 1 },
    };
    req.query.price === "desc" && (sortAndPaginate.sort.price = -1);
    let isLoggedIn;
    let isAdmin;
    try {
      const user = verifyToken(req);
      isLoggedIn = true;
      user.role === "admin" ? (isAdmin = true) : (isAdmin = false);
    } catch (error) {
      isLoggedIn = false;
    }
    try {
      const allProducts = await products.read({ filter, sortAndPaginate });
      const productsCopy = allProducts.docs.map((doc) => ({
        photo: doc.photo,
        title: doc.title,
        price: doc.price,
      }));
      return res.render("index", {
        products: productsCopy,
        title: "Insawear | HOME",
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        next: allProducts.nextPage,
        prev: allProducts.prevPage,
      });
    } catch (error) {
      return res.render("index", {
        noProducts: error.message,
        title: "Insawear | HOME",
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
      });
    }
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/form", formRouter);
viewsRouter.use("/auth", authRouter);
viewsRouter.use("/orders", ordersRouter);

export default viewsRouter;
