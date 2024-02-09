import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.js";
import propsProducts from "../../middlewares/propsProducts.js";
import propsUpdateProduct from "../../middlewares/propsUpdateProduct.js";

const productsRouter = Router();

productsRouter.post("/", isAdmin, propsProducts, async (req, res, next) => {
  try {
    const response = await products.create(req.body);
    return res.json({
      statusCode: 201,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    req.query.title && (filter.title = new RegExp(req.query.title.trim(), "i"));
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { price: 1 },
    };
    req.query.price === "desc" && (sortAndPaginate.sort.price = -1);
    const response = await products.read({ filter, sortAndPaginate });
    if (typeof response === "string") {
      return res.json({
        statusCode: 404,
        response: response,
      });
    }
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.readOne(pid);
    if (typeof response === "string") {
      return res.json({
        statusCode: 404,
        response: response,
      });
    }
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.put(
  "/:pid",
  isAdmin,
  propsUpdateProduct,
  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const response = await products.update(pid, data);
      if (typeof response === "string") {
        if (
          response === `The product with the ID ${pid} doesn´t exist.` ||
          response === "There are no products yet."
        ) {
          return res.json({
            statusCode: 404,
            response: response,
          });
        } else {
          return res.json({
            statusCode: 400,
            response: response,
          });
        }
      }
      return res.json({
        statusCode: 200,
        response: response,
      });
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.delete("/:pid", isAdmin, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
    if (typeof response === "string") {
      return res.json({
        statusCode: 404,
        response: response,
      });
    }
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
