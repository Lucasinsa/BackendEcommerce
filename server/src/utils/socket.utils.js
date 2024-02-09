import { products } from "../data/mongo/manager.mongo.js";
import propsProductsUtils from "./propsProducts.utils.js";

export default async(socket) => {
  console.log(`Client ${socket.id} connected.`);
  socket.on("new product", async (data) => {
    try {
      propsProductsUtils(data);
      await products.create(data);
      socket.emit("propsProductError", { error: false });
    } catch (error) {
      socket.emit("propsProductError", { error: true, message: error.message });
    }
  });
};
