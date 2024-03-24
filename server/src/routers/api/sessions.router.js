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
    return res.cookie("token", req.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).json({
      statusCode: 200,
      response: "Logged in.",
      token: req.token
    });
  } catch (error) {
    next(error);
  }
});

//Google 
sessionsRouter.post("/google", passport.authenticate("google",  { scope: ["email", "profile"] }))

//Google callback
sessionsRouter.get("/google/callback", passport.authenticate("google",  { session: false, failureRedirect: "api/sessions/badauth" }), async(req, res, next) => {
  try {
    return res.cookie("token", req.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).json({
      statusCode: 200,
      response: "Logged in with Google!",
      token: req.token
    })
  } catch (error) {
    next(error)
  }
})

//Github
sessionsRouter.post("/github", passport.authenticate("github",  { scope: ["email", "profile"] }))

//Github callback
sessionsRouter.get("/github/callback", passport.authenticate("github",  { session: false, failureRedirect: "api/sessions/badauth" }), async(req, res, next) => {
  try {
    return res.cookie("token", req.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).json({
      statusCode: 200,
      response: "Logged in with Github!",
      token: req.token
    })
  } catch (error) {
    next(error)
  }
})

//Me
sessionsRouter.post("/me", (req, res, next) => {
  try {
    const token = verifyToken(req)
    return res.json({
        statusCode: 200,
        response: `Session with user ID: ${token.email}.`,
    });
  } catch (error) {
    next(error);
  }
});

//Signout
sessionsRouter.post("/signout", async(req, res, next) => {
  try {
    verifyToken(req)
    return res.clearCookie("token").json({
        statusCode: 200,
        response: "Signed out!",
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
