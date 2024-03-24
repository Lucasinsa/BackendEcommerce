import CustomRouter from "../CustomRouter.js";
import { categories } from "../../data/mongo/manager.mongo.js";

export default class CategoriesRouter extends CustomRouter {
    init() {
        this.create("/", ["ADMIN", "PREMIUM"], async(req,res,next) => {
            try {
                const response = await categories.create(req.body)
                return res.success201(response)
            } catch (error) {
                return next(error)     
            }
        })
        this.read("/", ["PUBLIC"], async (req, res, next) => {
            try {
              const filter = {};
              req.query.category && (filter.category = new RegExp(req.query.category.trim(), "i"));
              const sortAndPaginate = {
                limit: req.query.limit || 20,
                page: req.query.page || 1,
              };
              const response = await categories.read({ filter, sortAndPaginate });
              return res.success200(response)
            } catch (error) {
              next(error);
            }
          })
        this.read("/:id", ["PUBLIC"], async(req, res, next) => {
            try {
                const { id } = req.params
                const response = await categories.readOne(id)
                res.success200(response)
            } catch (error) {
                return next(error) 
            }
        })
        this.update("/:id", ["ADMIN", "PREMIUM"], async(req, res, next) => {
            try {
                const { id } = req.params
                const response = await categories.update(id, req.body)
                res.success200(response)
            } catch (error) {
                return next(error) 
            }
        })
        this.destroy("/:id", ["ADMIN", "PREMIUM"], async(req, res, next) => {
            try {
                const { id } = req.params
                const response = await categories.destroy(id)
                res.success200(response)
            } catch (error) {
                return next(error) 
            }
        })
    }
}