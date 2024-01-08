import { Router } from "express";
import users from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
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

usersRouter.get("/", (req, res, next) => {
  try {
    const response = users.read();
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

usersRouter.get("/:uid", (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = users.readOne(uid);
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
