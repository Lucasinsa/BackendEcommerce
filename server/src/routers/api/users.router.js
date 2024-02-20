import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.js";
import propsUpdateUser from "../../middlewares/propsUpdateUser.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const response = await users.create(req.body);
    return res.json({
      statusCode: 201,
      response: response,
    });
  } catch (error) {
      next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    req.query.email && (filter.email = new RegExp(req.query.email.trim(), "i"));
    const sortAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { name: 1 },
    };
    req.query.name === "desc" && (sortAndPaginate.sort.name = -1);
    const response = await users.read({ filter, sortAndPaginate });
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:uid", isAdmin, propsUpdateUser, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const response = await users.update(uid, data);
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await users.destroy(uid);
    return res.json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
