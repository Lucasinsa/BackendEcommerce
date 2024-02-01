import { Router } from "express";
import products from "../../data/mongo/products.mongo.js";
import isAdmin from "../../middlewares/isAdmin.js";
import propsProducts from "../../middlewares/propsProducts.js";

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

productsRouter.get("/", async(req, res, next) => {
  try {
    const filter = req.query.price ? { price: { $gt: req.query.price } } : {}
    const order = req.query.order ? { title: req.query.order } : {}
    const response = await products.read({filter, order});
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

productsRouter.get("/:pid", async(req, res, next) => {
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

productsRouter.put("/:pid", isAdmin , async (req, res, next) => {
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
});

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
