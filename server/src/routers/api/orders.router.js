import { Router } from "express";
import { orders } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.js";
import isOrderQuantityOk from "../../middlewares/isOrderQuantityOk.js";
import propsUpdateOrder from "../../middlewares/propsUpdateOrder.js";

const ordersRouter = Router();

ordersRouter.post("/", isAdmin, isOrderQuantityOk, async (req, res, next) => {
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

ordersRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    req.query.state && (filter.state = req.query.state);
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { quantity: 1 },
    };
    req.query.quantity === "desc" && (sortAndPaginate.sort.quantity = -1);
    const response = await orders.read({ filter, sortAndPaginate });
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

ordersRouter.get("/total/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await orders.report(uid);
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

ordersRouter.put("/:oid", isAdmin, propsUpdateOrder, async (req, res, next) => {
  try {
    const { oid } = req.params;
    const { quantity, state } = req.body;
    const data = { quantity, state };
    const response = await orders.update(oid, data);
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
