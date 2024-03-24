import passport from "passport";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.json({
          statusCode: info.statusCode || 401,
          response: info.message || info.toString(),
        });
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
