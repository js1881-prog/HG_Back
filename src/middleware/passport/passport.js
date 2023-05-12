const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const logger = require("../../util/logger/logger");
const LocalStrategy = require("passport-local").Strategy;
const jwtUtils = require("../jwt/jwtUtils");
const { comparePassword } = require("../../util/encrypt/hashPassword");
const { storeTokensInRedis } = require("./redis/stroreTokensInredis");
const {
  googleOauthClientId,
  googleOauthSecurePassword,
} = require("../../config/dotenv");

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
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

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: googleOauthClientId,
      clientSecret: googleOauthSecurePassword,
      callbackURL: "http://localhost:3000/api/v1/auths/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // TODO => Service logic
        // User.findOne({ email: profile._json.email })
        //   .then((existingUser) => {
        //     if (existingUser) {
        //       done(null, existingUser);
        //     } else {
        //       new User({ email: profile._json.email, name: profile._json.name, nickname: null, role:"user" })
        //         .save()
        //         .then((user) => done(null, user))
        //         .catch((err) => done(err, null));
        //     }
        //   })
        //   .catch((err) => done(err, null));

        const example = {
          id: 261651,
          name: null,
          nickname: null,
          email: profile._json.email,
          role: "user",
        };

        const accessTokenJwt = jwtUtils.generateAccessToken(example);
        const refreshTokenJwt = jwtUtils.generateRefreshToken(example);
        await storeTokensInRedis(accessTokenJwt, refreshTokenJwt, example);
        return done(null, example, { accessToken, refreshToken });
      } catch (error) {
        logger.error(error);
        return done(error, false);
      }
    }
  )
);

module.exports = passport;
