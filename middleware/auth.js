import passport from "passport";

const verifyUser = (req, resolve, reject) => async (err, user, info) => {
  console.log(info);

  if (err || info || !user) {
    return reject("Unauthorized user");
  }
  
  req.user = user;
  resolve();
};

export const Auth = () => async (req, res, next) => {
  try {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "user_auth",
        { session: false },
        verifyUser(req, resolve, reject)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => {
        return res.status(401).json({ data: null, message: "Unauthorized" });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
