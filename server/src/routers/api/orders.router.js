import { Router } from "express";
import orders from "../../data/fs/orders.fs.js";

const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orders.create(data);
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

ordersRouter.get("/:uid", (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = orders.readOne(uid);
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

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await orders.destroy(oid);
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

export default ordersRouter;
