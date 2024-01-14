import { Router } from "express";
import products from "../../data/fs/products.fs.js";
import realRouter from "./real.router.js";
import formRouter from "./form.router.js";
import registerRouter from "./register.router.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const allProducts = products.read();
    if (typeof allProducts === "string") {
      return res.render("index", {
        noProducts: allProducts,
        title: "Insawear | HOME",
      });
    } else {
      return res.render("index", {
        products: allProducts,
        title: "Insawear | HOME",
      });
    }
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/real", realRouter);
viewsRouter.use("/form", formRouter);
viewsRouter.use("/register", registerRouter);

export default viewsRouter;
