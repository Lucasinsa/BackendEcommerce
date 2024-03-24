import has8char from "../../middlewares/has8char.js";
import passport from "../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallBack.js";
import CustomRouter from "../CustomRouter.js";

export default class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passCallBack("register"), has8char, async (req, res, next) => {
      try {
        return res.success201("Registered!")
      } catch (error) {
        next(error);
      }
    })
    this.create("/login", ["PUBLIC"], passCallBack("login"), async (req, res, next) => {
      try {
        return res.cookie("token", req.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).json({
          statusCode: 200,
          response: "Logged in.",
          token: req.token
        });
      } catch (error) {
        next(error);
      }
    })
    this.create("/google", ["PUBLIC"], passport.authenticate("google",  { scope: ["email", "profile"] }))
    this.read("/google/callback", ["PUBLIC"], passport.authenticate("google",  { session: false, failureRedirect: "api/sessions/badauth" }), async(req, res, next) => {
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
    this.create("/github", ["PUBLIC"], passport.authenticate("github",  { scope: ["email", "profile"] }))
    this.read("/github/callback", passport.authenticate("github",  { session: false, failureRedirect: "api/sessions/badauth" }), async(req, res, next) => {
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
    this.create("/me", ["USER", "ADMIN", "PREMIUM"],passCallBack("jwt"), async(req, res, next) => {
      try {
        return res.success200(`Session with user: ${req.user.email}.`)
      } catch (error) {
        next(error);
      }
    })
    this.create("/signout",  ["USER", "ADMIN", "PREMIUM"], passCallBack("jwt") ,async(req, res, next) => {
      try {
        return res.clearCookie("token").json({
            statusCode: 200,
            response: "Signed out!",
        });
      } catch (error) {
        next(error);
      }
    })
    this.read("/badauth", ["PUBLIC"], (req, res, next) => {
      try {
        return res.error401()
      } catch (error) {
        next(error)
      }
    })
  }
}