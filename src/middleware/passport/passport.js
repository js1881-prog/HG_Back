const passport = require("passport");
const passportJWT = require("passport-jwt");
const logger = require("../../util/logger/logger");
const ExtractJwt = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = passportJWT.Strategy;
const { jwtSecret } = require("../../config/dotenv");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../jwt/jwtUtils");
const { comparePassword } = require("../../util/encrypt/hashPassword");
const { storeTokensInRedis } = require("./util/stroreTokensInredis");
const redis = require("../../util/connect/redis");

const jwtExtractor = (req) => {
  const token = req?.headers?.authorization;
  return token ? token.replace("Bearer ", "") : null;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractor]),
  secretOrKey: jwtSecret,
};

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
        const accessToken = generateAccessToken(example);
        const refreshToken = generateRefreshToken(example);
        await storeTokensInRedis(accessToken, refreshToken, example);
        req.accessToken = accessToken;
        req.refreshToken = refreshToken;
        return done(null, true, { accessToken, refreshToken });
      } catch (err) {
        logger.error(err);
        return done(err, false);
      }
    }
  )
);

module.exports = passport;
