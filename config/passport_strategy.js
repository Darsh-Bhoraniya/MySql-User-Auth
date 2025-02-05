import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import Models from "../models/index.js";
import db_services from "../utils/db_services.js";
import config from "./app_config.js";


export const authenticateUser = (passport_obj) => {
  const jwtSecret = config.JWT_SECRET;
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  };

  passport.use(
    "user_auth",
    new Strategy(options, async (payload, done) => {
      
      try {
        const user = await db_services.findOne(Models.user, {
          id: payload.sub,
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
