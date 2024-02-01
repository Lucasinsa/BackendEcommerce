import { Router } from "express";
import users from "../../data/mongo/users.mongo.js";
import isAdmin from "../../middlewares/isAdmin.js";

const usersRouter = Router();

usersRouter.post("/", isAdmin, async (req, res, next) => {
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
    const filter = req.query.name ? { name:  req.query.name } : {}
    const order = req.query.order ? { name: req.query.order } : {}
    const response = await users.read({filter, order});
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

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await users.readOne(uid);
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

usersRouter.put("/:uid", isAdmin, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const response = await users.update(uid, data);
    if (typeof response === "string") {
      if (
        response === `The user with the ID ${uid} doesn´t exist.` ||
        response === "There are no users yet."
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

usersRouter.delete("/:uid", isAdmin, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await users.destroy(uid);
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

export default usersRouter;
