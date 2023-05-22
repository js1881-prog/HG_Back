const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const typeORMDataSource = require("../util/connect/typeorm");
const logger = require("../util/logger/logger");
const userSchema = require("../user/user.entity");
const { User } = require("../user/User");

const query = typeORMDataSource.getRepository(userSchema);

const followRepository = {
  /**
   * Find the user ID by the given username.
   * @memberof followRepository
   * @async
   * @param {string} userName - The username to search for.
   * @returns {Promise<number>} The ID of the user with the given username.
   * @throws {AppError} If the user is not found, an AppError with a 404 status code is thrown.
   * @throws {AppError} If there is an error during the database operation, an AppError with a 500 status code is thrown.
   */
  async findUserIdByUserName(userName) {
    try {
      const user = await query.findOne({ where: { userName: userName } });
      if (!user) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Not Found"
        );
      }
      return user.id;
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  /**
   * Add a follow relationship between the user and the target user.
   * @memberof followRepository
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} targetId - The ID of the target user to follow.
   * @throws {AppError} If either the user or the target user is not found, an AppError with a 404 status code is thrown.
   * @throws {AppError} If there is an error during the database operation, an AppError with a 500 status code is thrown.
   */
  async addFollowById(userId, targetId) {
    try {
      const user = await query.findOne({ where: { id: userId } });
      const target = await query.findOne({ where: { id: targetId } });

      if (!user || !target) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Not Found"
        );
      }

      await query
        .createQueryBuilder()
        .relation(User, "follow")
        .of(user)
        .add(target);
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  /**
   * Remove the follow relationship between the user and the target user.
   * @memberof followRepository
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} targetId - The ID of the target user to unfollow.
   * @throws {AppError} If the user is not found, an AppError with a 404 status code is thrown.
   * @throws {AppError} If there is an error during the database operation, an AppError with a 500 status code is thrown.
   */
  async removeFollowById(userId, targetId) {
    try {
      const user = await query.findOne({ where: { id: userId } });
      const target = await query.findOne({ where: { id: targetId } });

      if (!user || !target) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Not Found"
        );
      }

      await query
        .createQueryBuilder()
        .relation(User, "follow")
        .of(user)
        .remove(target);
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  /**
   * Get the number of users that the given user is following.
   * @memberof followRepository
   * @async
   * @param {number} userId - The ID of the user.
   * @returns {Promise<number>} The number of users that the given user is following.
   * @throws {AppError} If the user is not found, an AppError with a 404 status code is thrown.
   * @throws {AppError} If there is an error during the database operation, an AppError with a 500 status code is thrown.
   */
   async findFollowsAndCountById(userId) {
    try {
      console.log(userId);
      const follows = await query
      .createQueryBuilder("user")
      .select(["user.userName", "user.intro"])
      .leftJoin("user.follow", "follow")
      .where("follow.id = :userId", { userId })
      .getMany();
  
      follows.forEach((follow) => { // 'forEach'를 사용하여 각 팔로우에서 필요 없는 정보를 삭제합니다.
        delete follow.follow
        delete follow.id
        delete follow.createdAt
        delete follow.updatedAt
        delete follow.deletedAt
      });
  
      return { followCount: follows.length, followers: follows };
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

async findFollowersAndCountById(userId) {
  try {
    let follows = await query
      .createQueryBuilder("user")
      .select(["user.userName", "user.intro", "target.userName", "target.intro"]) 
      .leftJoin("user.follow", "follow")
      .leftJoin("follow.target", "target")
      .where("user.id = :id", { id: userId })
      .andWhere("target.id <> :id", { id: userId })
      .getMany();
    
      console.log(follows);

    follows.forEach((follow) => { 
      delete follow.follow;
      delete follow.id;
      delete follow.createdAt;
      delete follow.updatedAt;
      delete follow.deletedAt;
    });

    return { followCount: follows.length, followers: follows };
  } catch (error) {
    logger.error(error);
    throw new AppError(
      commonErrors.databaseError,
      500,
      "Internal Server Error"
    );
  }
},

  /**
   * Get the number of users who are following the given user.
   * @memberof followRepository
   * @async
   * @param {number} userId - The ID of the user.
   * @returns {Promise<number>} The number of users who are following the given user.
   * @throws {AppError} If the user is not found, an AppError with a 404 status code is thrown.
   * @throws {AppError} If there is an error during the database operation, an AppError with a 500 status code is thrown.
   */
   async findFollowsCountById(userId) {
    try {
      const user = await query
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.follow", "follow")
        .where("user.id = :id", { id: userId })
        .getOne();

      return user ? user.follow.length : 0;
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  
  async findFollowersCountById(userId) {
    try {
      const count = await query
        .createQueryBuilder("user")
        .innerJoin("user.follow", "follow")
        .where("follow.id = :id", { id: userId })
        .getCount();

      return count;
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
};

module.exports = followRepository;
