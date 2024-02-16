import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.js";
import isValidPass from "../../middlewares/isValidPass.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", has8char, async (req, res, next) => {
  try {
    await users.create(req.body);
    return res.json({
      statusCode: 201,
      response: "Registered!",
    });
  } catch (error) {
    next(error);
  }
});

sessionsRouter.post("/login", isValidPass, async (req, res, next) => {
  try {
    req.session.email = req.body.email;
    req.session.role = "admin";
    return res.json({
      statusCode: 200,
      response: "Logged in.",
    });
  } catch (error) {
    next(error);
  }
});

sessionsRouter.post("/me", (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: `Session with email: ${req.session.email}.`,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: "Bad auth.",
      });
    }
  } catch (error) {
    next(error);
  }
});

sessionsRouter.post("/signout", (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Signed out.",
      });
    } else {
      return res.json({
        statusCode: 400,
        message: "Bad auth.",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default sessionsRouter;
