import { Router } from "express";

const realRouter = Router();

realRouter.get("/", (req, res, next) => {
  try {
    return res.render("real", { title: "Insawear | REAL" });
  } catch (error) {
    next(error);
  }
});

export default realRouter;
