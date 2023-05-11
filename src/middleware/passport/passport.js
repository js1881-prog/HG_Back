const passport = require("passport");
const logger = require("../../util/logger/logger");
const LocalStrategy = require("passport-local").Strategy;
const jwtUtils = require("../jwt/jwtUtils");
const { comparePassword } = require("../../util/encrypt/hashPassword");
const { storeTokensInRedis } = require("./redis/stroreTokensInredis");

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, username, password, done) {
      try {
        //sample data
        const example = {
          id: 261651,
          name: "john",
          nickname: "kim",
          email: "asf@mail.com",
          role: "user",
        };
        // TODO => To authenticate/login a user by accessing the database.

        // const user = await User.findOne({ username });
        // if (!user) {
        //   return done(null, false);
        // }
        // const isMatch = await comparePassword(password, user.password);
        // if (!isMatch) {
        //   return done(null, false);
        // }

        const accessToken = jwtUtils.generateAccessToken(example);
        const refreshToken = jwtUtils.generateRefreshToken(example);
        await storeTokensInRedis(accessToken, refreshToken, example);
        return done(null, true, { accessToken, refreshToken });
      } catch (err) {
        logger.error(err);
        return done(err, false);
      }
    }
  )
);

module.exports = passport;
