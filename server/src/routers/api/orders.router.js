import { Router } from "express";
import orders from "../../data/mongo/orders.mongo.js";
import isAdmin from "../../middlewares/isAdmin.js";

const ordersRouter = Router();

ordersRouter.post("/", isAdmin, async (req, res, next) => {
  try {
    const response = await orders.create(req.body);
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

ordersRouter.get("/", async (req,res,next) => {
  try {
    const filter = req.query.state ? { state: req.query.state } : {}
    const order = req.query.order ? { quantity: req.query.order } : {}
    const response = await orders.read({filter, order})
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
    next(error)
  }
})

ordersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await orders.readOne(uid);
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

ordersRouter.delete("/:oid", isAdmin, async (req, res, next) => {
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

ordersRouter.put("/:oid", isAdmin, async (req, res, next) => {
  try {
    const { oid } = req.params;
    const {quantity, state} = req.body;
    const response = await orders.update(oid, quantity, state);
    if (typeof response === "string") {
      if (
        response === `The orders with the ID ${oid} doesn´t exist.` ||
        response === "There are no orders yet."
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

export default ordersRouter;
