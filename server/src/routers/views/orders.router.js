import { verifyToken } from "../../utils/token.utils.js";
import { orders } from "../../data/mongo/manager.mongo.js";
import CustomRouter from "../CustomRouter.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "PREMIUM"], async (req, res, next) => {
      try {
        let isLoggedIn = false;
        let isAdmin = false;
        let isPremium = false;
        let userOrders = false;
        try {
          const user = verifyToken(req);
          isLoggedIn = true;
          if (user.role === 1) isAdmin = true;
          if (user.role === 2) isPremium = true;
          try {
            userOrders = await orders.readOne(user.uid);
            userOrders = userOrders.map((doc) => {
              console.log(doc);
              return {
                photo: doc.cid.photo,
                name: doc.cid.name,
                price: doc.cid.price,
                state: doc.state.charAt(0).toUpperCase() + doc.state.slice(1),
                quantity: doc.quantity,
              };
            });
          } catch (error) {
            userOrders = false;
          }
        } catch (error) {}
        return res.render("orders", {
          title: "Insawear | ORDERS",
          isLoggedIn: isLoggedIn,
          isAdmin: isAdmin,
          isPremium: isPremium,
          userOrders: userOrders,
        });
      } catch (error) {
        return next(error);
      }
    })
  }
}