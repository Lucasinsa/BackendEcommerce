import CustomRouter from "../CustomRouter.js";
import { users } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.js";
import propsUpdateUser from "../../middlewares/propsUpdateUser.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const response = await users.create(req.body);
        return res.success201(response)
      } catch (error) {
          next(error);
      }
    })
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const filter = {};
        req.query.email && (filter.email = new RegExp(req.query.email.trim(), "i"));
        const sortAndPaginate = {
          limit: req.query.limit || 10,
          page: req.query.page || 1,
          sort: { name: 1 },
        };
        req.query.name === "desc" && (sortAndPaginate.sort.name = -1);
        const response = await users.read({ filter, sortAndPaginate });
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.read("/:uid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const response = await users.readOne(uid);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.update("/:uid", ["PUBLIC"], isAdmin, propsUpdateUser, async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const response = await users.update(uid, data);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.destroy("/:uid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const response = await users.destroy(uid);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
  }
}