import { sizes } from "../../data/mongo/manager.mongo.js";
import CustomRouter from "../CustomRouter.js";

export default class SizesRouter extends CustomRouter {
    init() {
        this.create("/", ["ADMIN", "PREMIUM"], async(req,res,next) => {
            try {
                const response = await sizes.create(req.body)
                return res.success201(response)
            } catch (error) {
                return next(error)     
            }
        })
        this.read("/", ["PUBLIC"], async (req, res, next) => {
            try {
              const filter = {};
              req.query.size && (filter.size = new RegExp(req.query.size.trim(), "i"));
              const sortAndPaginate = {
                limit: req.query.limit || 20,
                page: req.query.page || 1,
              };
              const response = await sizes.read({ filter, sortAndPaginate });
              return res.success200(response)
            } catch (error) {
              next(error);
            }
          })
          this.read("/:id", ["PUBLIC"], async(req, res, next) => {
            try {
                const { id } = req.params
                const response = await sizes.readOne(id)
                res.success200(response)
            } catch (error) {
                return next(error) 
            }
        })
        this.update("/:id", ["ADMIN", "PREMIUM"], async (req, res, next) => {
            try {
              const { id } = req.params;
              const data = req.body;
              const response = await sizes.update(id, data);
              return res.success200(response);
            } catch (error) {
              next(error);
            }
          });
          this.destroy("/:id", ["ADMIN", "PREMIUM"], async(req, res, next) => {
            try {
                const { id } = req.params
                const response = await sizes.destroy(id)
                res.success200(response)
            } catch (error) {
                return next(error) 
            }
        })
    }
}