import products from "../data/fs/products.fs.js";
import propsProductsUtils from "./propsProducts.utils.js";

export default (socket) => {
  console.log(`Client ${socket.id} connected.`);
  socket.emit("products", { products: products.read() });
  socket.on("new product", async (data) => {
    try {
      propsProductsUtils(data);
      await products.create(data);
      socket.emit("products", { products: products.read() });
      socket.emit("propsProductError", { error: false });
    } catch (error) {
      socket.emit("propsProductError", { error: true, message: error.message });
    }
  });
};
