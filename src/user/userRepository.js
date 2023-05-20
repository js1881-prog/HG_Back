const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const typeORMDataSource = require("../util/connect/typeorm");
const logger = require("../util/logger/logger");
const { User, UserBuilder } = require("./User");
const userSchema = require("./user.entity");

const query = typeORMDataSource.getRepository(userSchema);

const userRepository = {
  /**
   * Creates a new user.
   * @param {User} user - The user object.
   * @returns {User} The created user.
   */
  async create(user) {
    const createdUser = await query.save(user).catch((error) => {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    });
    return createdUser;
  },

  /**
   * Finds a user by email and updates it.
   * @param {string} email - The email of the user to find and update.
   * @param {Object} user - The updated user object.
   * @returns {User} The updated user.
   */
  async findByEmailAndUpdate(email, user) {
    const findUser = await query
      .findOne({ where: { email: email } })
      .catch((error) => {
        logger.error(error);
        throw new AppError(
          commonErrors.databaseError,
          500,
          "Internal Server Error"
        );
      });

    if (!findUser) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        404,
        "User not found"
      );
    }
    Object.assign(findUser, user);
    const updatedUser = await query.save(findUser).catch((error) => {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    });
    return updatedUser;
  },

  /**
   * Finds a user by userEmail.
   * @param {string} userEmail - The userEmail of the user to find.
   * @returns {User} The found user.
   */
  async findByEmail(email) {
    const user = await query
      .findOne({ where: { email: email } })
      .catch((error) => {
        logger.error(error);
        throw new AppError(
          commonErrors.databaseError,
          500,
          "Internal Server Error"
        );
      });
    return user;
  },

  /**
   * Finds a user by username.
   * @param {string} username - The username of the user to find.
   * @returns {User} The found user.
   */
  async findByName(name) {
    const user = await query
      .findOne({ where: { userName: name } })
      .catch((error) => {
        logger.error(error);
        throw new AppError(
          commonErrors.databaseError,
          500,
          "Internal Server Error"
        );
      });
    return user;
  },

  /**
   * Finds a user by name, email, and phone number.
   * @param {string} name - The name of the user to find.
   * @param {string} email - The email of the user to find.
   * @param {string} phoneNumber - The phone number of the user to find.
   * @returns {User} The found user.
   */
  async findByNameAndEmailAndPhoneNumber(name, email, phoneNumber) {
    const user = await query
      .findOne({
        where: [
          {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
          },
        ],
      })
      .catch((error) => {
        logger.error(error);
        throw new AppError(
          commonErrors.databaseError,
          500,
          "Internal Server Error"
        );
      });
    return user;
  },

  /**
   * Finds a user by ID and updates it.
   * @param {number} id - The ID of the user to find and update.
   * @param {User} user - The updated user object.
   * @returns {User} The updated user.
   */
  async findByIdAndUpdate(id, user) {
    const findUser = await query.findOne(id).catch((error) => {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    });

    if (!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        404,
        "User not found"
      );
    }
    Object.assign(findUser, user);
    const updatedUser = await query.save(user).catch((error) => {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    });
    return updatedUser;
  },

  /**
   * Finds a user by ID and deletes it.
   * @param {number} id - The ID of the user to find and delete.
   * @returns {User} The deleted user.
   */
  async findByIdAndDelete(id) {
    const user = await query.findOne(id).catch((error) => {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    });

    if (!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        404,
        "User not found"
      );
    }
    user.deletedAt = new Date();
    const deletedUser = await query.save(user).catch((error) => {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    });
    return deletedUser;
  },
};

module.exports = userRepository;
