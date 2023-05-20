const mailer = require("nodemailer");
const { mailAdmin, mailAdminPassword } = require("../../config/dotenv");
const AppError = require("../../misc/AppError");
const commonErrors = require("../../misc/commonErrors");
const logger = require("../../util/logger/logger");
const { findValueInRedis } = require("../redis/findValueInRedis");
const { storeMailCodeInRedis } = require("../redis/storeMailCodeInRedis");
const randomCode = require("./util/ramdomCode");

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: mailAdmin,
    pass: mailAdminPassword,
  },
});

/**
 * Sends a verification email with a randomly generated code.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @type {string} res.locals.mailCode - The provided code.
 * @returns {void}
 */
const sendVerificationPassword = (req, res, next) => {
  const code = randomCode;
  const mailOptions = {
    from: mailAdmin,
    to: req.body.email,
    subject: "TripSketch 이메일 인증코드 입니다.",
    text: `임시 비밀번호: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
      next(
        new AppError(commonErrors.businessError, 500, "Internal Server Error")
      );
    } else {
      logger.info("verifycode sent successfully.", info.response);
      res.locals.mailCode = code;
      next();
    }
  });
};

/**
 * Sends a verification email with a randomly generated code.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @type {string} res.locals.mailCode - The provided code.
 * @returns {void}
 */
const sendVerificationCode = async (req, res, next) => {
  const code = randomCode;
  const mailOptions = {
    from: mailAdmin,
    to: req.body.email,
    subject: "TripSketch 이메일 인증코드 입니다.",
    text: `아이디를 찾기 위한 인증 코드: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
      next(
        new AppError(commonErrors.businessError, 500, "Internal Server Error")
      );
    } else {
      logger.info("verifycode sent successfully.", info.response);
      res.locals.mailCode = code;
      next();
    }
  });

  await storeMailCodeInRedis(req.body.email, code);
};

/**
 * Verify the email code from the request body.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @type {string} res.locals.mail - The provided mail from Code.
 * @returns {void}
 */
const verifyEmailCode = async (req, res, next) => {
  const code = req.body.code;
  const value = await findValueInRedis(code);
  if (value === null) {
    return next(
      new AppError(commonErrors.authenticationError, 401, "Unauthorized")
    );
  }
  req.locals = {};
  req.locals.email = JSON.parse(value).email;
  next();
};

module.exports = {
  sendVerificationPassword,
  sendVerificationCode,
  verifyEmailCode,
};
