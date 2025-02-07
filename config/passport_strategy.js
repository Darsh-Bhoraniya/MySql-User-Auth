import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import Models from "../models/index.js";
import db_services from "../utils/db_services.js";
import dotenv from "dotenv";
import auth_const from "../constants/auth_const.js";
dotenv.config();

export const authenticateUser = (passport_obj) => {
  const jwtSecret = auth_const.JWT.ADMIN_SECRET;
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  };

  passport.use(
    "user_auth",
    new Strategy(options, async (payload, done) => {
      try {
        const user = await db_services.findOne(Models.User, {
          user_id: payload.sub,
        });

        if (user) {
          return done(null, { ...user.toJSON() });
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
