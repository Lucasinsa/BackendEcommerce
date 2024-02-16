import { Router } from "express";
import { orders } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.js";
import isOrderQuantityOk from "../../middlewares/isOrderQuantityOk.js";
import propsUpdateOrder from "../../middlewares/propsUpdateOrder.js";

const ordersRouter = Router();

ordersRouter.post("/", isAdmin, isOrderQuantityOk, async (req, res, next) => {
  try {
    const response = await orders.create(req.body);
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
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

export default ordersRouter;
