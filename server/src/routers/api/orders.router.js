import CustomRouter from "../CustomRouter.js";
import { orders } from "../../data/mongo/manager.mongo.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREMIUM"], async (req, res, next) => {
      try {
        const { _id } = req.user
        req.body.uid = _id
        const response = await orders.create(req.body);
        return res.success201(response)
      } catch (error) {
        next(error);
      }
    })
    this.read("/", ["USER", "PREMIUM"], async (req, res, next) => {
      try {
        const filter = {};
        req.query.state && (filter.state = req.query.state);
        const sortAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
        };
        const response = await orders.read({ filter, sortAndPaginate });
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.read("/:uid", ["USER", "PREMIUM"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const response = await orders.readOne(uid);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.read("/total/:uid", ["USER", "PREMIUM"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const response = await orders.report(uid);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.destroy("/:oid", ["USER", "PREMIUM"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const response = await orders.destroy(oid);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
    this.update("/:oid", ["USER", "PREMIUM"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const { quantity, state } = req.body;
        const data = { quantity, state };
        const response = await orders.update(oid, data);
        return res.success200(response)
      } catch (error) {
        next(error);
      }
    })
  }
}