import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import formRouter from "./form.router.js";
import registerRouter from "./register.router.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    req.query.title && (filter.title = new RegExp(req.query.title.trim(), "i"));
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { price: 1 },
    };
    req.query.price === "desc" && (sortAndPaginate.sort.price = -1);
    const allProducts = await products.read({ filter, sortAndPaginate });
    if (typeof allProducts === "string") {
      return res.render("index", {
        noProducts: allProducts,
        title: "Insawear | HOME",
      });
    } else {
      const productsCopy = allProducts.docs.map((doc) => ({
        photo: doc.photo,
        title: doc.title,
        price: doc.price,
      }));
      return res.render("index", {
        products: productsCopy,
        title: "Insawear | HOME",
      });
    }
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/form", formRouter);
viewsRouter.use("/register", registerRouter);

export default viewsRouter;
