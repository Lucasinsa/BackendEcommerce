import { products } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.js";
import propsUpdateProduct from "../../middlewares/propsUpdateProduct.js";
import CustomRouter from "../CustomRouter.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREMIUM"], propsProducts, async (req, res, next) => {
      try {
        const response = await products.create(req.body);
        return res.success201(response)
      } catch (error) {
        next(error);
      }
    })
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const filter = {};
        req.query.title && (filter.title = new RegExp(req.query.title.trim(), "i"));
        const sortAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { price: 1 },
        };
        req.query.price === "desc" && (sortAndPaginate.sort.price = -1);
        const response = await products.read({ filter, sortAndPaginate });
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const response = await products.readOne(pid);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.update("/:pid", ["ADMIN", "PREMIUM"], propsUpdateProduct, async (req, res, next) => {
      try {
        const { pid } = req.params;
        const data = req.body;
        const response = await products.update(pid, data);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.destroy("/:pid", ["ADMIN", "PREMIUM"] , async (req, res, next) => {
      try {
        const { pid } = req.params;
        const response = await products.destroy(pid);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
  }
}