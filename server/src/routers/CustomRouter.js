import { Router } from "express";
import { users } from "../data/mongo/manager.mongo.js";
import jwt from "jsonwebtoken";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}
  applyCbs(cbs) {
    return cbs.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params);
      } catch (error) {
        params[1].json({
          statusCode: 500,
          response: error.message,
        });
      }
    });
  }
  responses(req, res, next) {
    res.success200 = (payload) =>
      res.json({ statusCode: 200, response: payload });
    res.success201 = (payload) =>
      res.json({ statusCode: 201, response: payload });
    res.error400 = (message) =>
      res.json({ statusCode: 400, response: message });
    res.error401 = () => res.json({ statusCode: 401, response: "Bad auth!" });
    res.error403 = () => res.json({ statusCode: 403, response: "Forbidden!" });
    res.error404 = () => res.json({ statusCode: 404, response: "Not found!" });
    return next();
  }

  policies(arrayOfPolicies) {
    return async (req, res, next) => {
      try {
        if (arrayOfPolicies.includes("PUBLIC")) return next();
        let token = req.cookies["token"];
        if (!token) return res.error401();
        else {
          const data = jwt.verify(token, process.env.SECRET);
          if (!data) return res.error400("Bad auth by token!");
          else {
            const { email, role } = data;
            if (
              (role === 0 && arrayOfPolicies.includes("USER")) ||
              (role === 1 && arrayOfPolicies.includes("ADMIN")) ||
              (role === 2 && arrayOfPolicies.includes("PREMIUM"))
            ) {
              const user = await users.readByEmail(email);
              req.user = user;
              return next();
            } else return res.error403();
          }
        }
      } catch (error) {
        return next(error);
      }
    };
  }

  create(path, policies, ...cbs) {
    this.router.post(path, this.responses, this.policies(policies),  this.applyCbs(cbs));
  }
  read(path, policies, ...cbs) {
    this.router.get(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  update(path, policies, ...cbs) {
    this.router.put(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  destroy(path, policies, ...cbs) {
    this.router.delete(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  use(path, policies, ...cbs) {
    this.router.use(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
}