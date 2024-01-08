import { Router } from "express";
import products from "../../data/fs/products.fs.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    if (typeof response === "string") {
      return res.json({
        statusCode: 400,
        response: response,
      });
    }
    return res.json({
      statusCode: 201,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", (req, res, next) => {
  try {
    const response = products.read();
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

productsRouter.get("/:pid", (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = products.readOne(pid);
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

productsRouter.put("/:pid", async (req, res, next) => {
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

productsRouter.delete("/:pid", async (req, res, next) => {
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
