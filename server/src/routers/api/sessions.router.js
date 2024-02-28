import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.js";
import passport from "../../middlewares/passport.js";
import { verifyToken } from "../../utils/token.utils.js";

const sessionsRouter = Router();

//Local register
sessionsRouter.post("/register", has8char, passport.authenticate("register", { session: false, failureRedirect: "/api/sessions/badauth" }), async (req, res, next) => {
  try {
    return res.json({
      statusCode: 201,
      response: "Registered!",
    });
  } catch (error) {
    next(error);
  }
});

//Local login
sessionsRouter.post("/login", passport.authenticate("login",  { session: false, failureRedirect: "/api/sessions/badauth" }), async (req, res, next) => {
  try {
    return res.json({
      statusCode: 200,
      response: "Logged in.",
      token: req.token
    });
  } catch (error) {
    next(error);
  }
});

//Google 
sessionsRouter.get("/google", passport.authenticate("google",  { scope: ["email", "profile"] }))

//Google callback
sessionsRouter.get("/google/callback", passport.authenticate("google",  { session: false, failureRedirect: "api/sessions/badauth" }), async(req, res, next) => {
  try {
    return res.json({
      statusCode: 200,
      response: "Logged in with Google!",
      // token: localStorage.getItem("token")
    })
  } catch (error) {
    next(error)
  }
})

//Me
sessionsRouter.post("/me", (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: `Session with email: ${req.session.email}.`,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: "Bad auth.",
      });
    }
  } catch (error) {
    next(error);
  }
});

//Signout
sessionsRouter.post("/signout", async(req, res, next) => {
  try {
    localStorage.getItem("token") && localStorage.removeItem("token")
    return res.json({
      statusCode: 200,
      message: "Signed out!",
    });
  } catch (error) {
    next(error);
  }
});

//Bad auth
sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      response: "Bad auth."
    })
  } catch (error) {
    next(error)
  }
})

export default sessionsRouter;
