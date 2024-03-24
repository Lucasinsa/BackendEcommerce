import { Router } from "express";
import { verifyToken } from "../../utils/token.utils.js";
import { orders } from "../../data/mongo/manager.mongo.js";

const ordersRouter = Router();

ordersRouter.get("/", async (req, res, next) => {
  try {
    let isLoggedIn;
    let isAdmin;
    let userOrders = false;
    try {
      const user = verifyToken(req);
      isLoggedIn = true;
      user.role === "admin" ? (isAdmin = true) : (isAdmin = false);
      try {
        userOrders = await orders.readOne(user.uid);
        userOrders = userOrders.map((doc) => {
          return {
            photo: doc.pid.photo,
            title: doc.pid.title,
            price: doc.pid.price,
            state: doc.state.charAt(0).toUpperCase() + doc.state.slice(1),
            quantity: doc.quantity,
          };
        });
      } catch (error) {
        userOrders = false;
      }
    } catch (error) {
      isLoggedIn = false;
    }
    return res.render("orders", {
      title: "Insawear | ORDERS",
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
      userOrders: userOrders,
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
