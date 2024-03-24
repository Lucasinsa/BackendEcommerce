import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { createHash, isValidPass } from "../utils/hash.utils.js";
import { users } from "../data/mongo/manager.mongo.js";
import { createToken } from "../utils/token.utils.js";

const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT } = process.env

//Local register strategy
passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await users.readByEmail(email);
        if (one) {
          return done(null, false);
        } else {
          let data = req.body;
          data.password = createHash(password);
          let user = await users.create(data);
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

//Local login strategy
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        if (user) {
          const verify = isValidPass(password, user.password);
          if (verify) {
            const token = createToken({ email, role: user.role, uid: user._id })
            req.token = token
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

//Google strategy
passport.use("google", new GoogleStrategy(
  {
    passReqToCallback: true,
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_CLIENT,
    callbackURL: "http://localhost:8080/api/sessions/google/callback",
  }, 
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      let user = await users.readByEmail(profile.id)
      if(!user) {
        user = {
          name: profile.name.givenName,
          photo: profile.coverPhoto || "url",
          email: profile.id,
          password: createHash(profile.id)
        }
        await users.create(user);
      }
      const token = createToken({ email: user.email, role: user.role, uid: user._id })
      req.token = token
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
));

//Github strategy
passport.use("github", new GithubStrategy(
  {
    passReqToCallback: true,
    clientID: GITHUB_ID,
    clientSecret: GITHUB_CLIENT,
    callbackURL: "http://localhost:8080/api/sessions/github/callback",
  }, 
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      let user = await users.readByEmail(profile.id)
      if(!user) {
        user = {
          name: profile._json.name,
          photo: profile._json.avatar_url || "url",
          email: profile._json.id,
          password: createHash(profile.id)
        }
        await users.create(user);
      }
      const token = createToken({ email: user.email, role: user.role, uid: user._id })
      req.token = token
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
));

export default passport;
