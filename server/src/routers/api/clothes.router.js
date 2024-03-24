import { clothes } from "../../data/mongo/manager.mongo.js";
import CustomRouter from "../CustomRouter.js";
import propsProducts from "../../middlewares/propsProducts.js";

export default class ClothesRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREMIUM"],
      propsProducts,
      async (req, res, next) => {
        try {
          const response = await clothes.create(req.body);
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }
    );
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const filter = {};
        req.query.name &&
          (filter.name = new RegExp(req.query.name.trim(), "i"));
        const sortAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.page || 1
        };
        const response = await clothes.read({ filter, sortAndPaginate });
        return res.success200(response);
      } catch (error) {
        next(error);
      }
    });
    this.read("/:id", ["PUBLIC"], async (req, res, next) => {
      try {
        const { id } = req.params;
        const response = await clothes.readOne(id);
        return res.success200(response);
      } catch (error) {
        next(error);
      }
    });
    this.update("/:id", ["ADMIN", "PREMIUM"], async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = req.body;
        const response = await clothes.update(id, data);
        return res.success200(response);
      } catch (error) {
        next(error);
      }
    });
    this.destroy("/:id", ["ADMIN", "PREMIUM"], async (req, res, next) => {
      try {
        const { id } = req.params;
        const response = await clothes.destroy(id);
        return res.success200(response);
      } catch (error) {
        next(error);
      }
    });
  }
}
