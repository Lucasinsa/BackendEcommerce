import CustomRouter from "../CustomRouter.js";

export default class AuthRouter extends CustomRouter {
    init() {
        this.read("/register", ["PUBLIC"],(req,res,next) => {
            try {
                return res.render("register", { title: "Insawear | REGISTER" });
              } catch (error) {
                next(error);
              }
        })
        this.read("/login", ["PUBLIC"],(req,res,next) => {
            try {
                return res.render("login", { title: "Insawear | LOGIN" });
            } catch (error) {
                next(error);
            }
        })
    }
}