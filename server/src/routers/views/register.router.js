import { Router } from "express";

const registerRouter = Router();

registerRouter.get("/register", (req, res, next) => {
  try {
    return res.render("register", { title: "Insawear | REGISTER" });
  } catch (error) {
    next(error);
  }
});

export default registerRouter;
