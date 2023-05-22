/**
 * useService,
 * @param {User} User - The User class.
 * @param {UserBuilder} UserBuilder - The UserBuilder class.
 * @param {Object} userRepository - The user repository object.
 * @param {Function} AppError - The AppError class.
 * @param {Object} commonErrors - The commonErrors object.
 * @param {Object} logger - The logger object.
 * @returns {Object} The user service object.
 */
const userService = (
  User,
  UserBuilder,
  userRepository,
  followRepository,
  AppError,
  commonErrors,
  logger,
  hashPassword,
  comparePassword
) => ({
  /**
   * Sign up a new user.
   * @param {user} - The user data transfer object.
   * @returns {User} The created user.
   */
  signup: async (user) => {
    const checkUser = await userRepository.findByNameAndEmailAndPhoneNumber(
      user.name,
      user.email,
      user.phoneNumber
    );

    if (checkUser) {
      throw new AppError(
        commonErrors.resourceAlreadyExists,
        409,
        "User already exists"
      );
    }
    const hashedPassword = await hashPassword(user.password);
    /**
     * Builder
     * @type {User}
     */
    const newUser = new UserBuilder()
      .setNickName(user.nickName)
      .setUserName(user.userName)
      .setPassword(hashedPassword)
      .setRole(user.role)
      .setPhoneNumber(user.phoneNumber)
      .setEmail(user.email)
      .setIntro(user.intro)
      .build();
    const createdUser = await userRepository.create(newUser);
    return createdUser;
  },

  /**
   * login.
   * @param {name} - string
   * @param {password} - string
   * @returns {user} The checked user.
   */
  login: async (name, password) => {
    const checkUser = await userRepository.findByName(name);

    if (!checkUser) {
      throw new AppError(commonErrors.authenticationError, 401, "Unauthorized");
    }
    const isMatch = await comparePassword(password, checkUser.password);

    if (isMatch) {
      return checkUser;
    } else {
      throw new AppError(commonErrors.authenticationError, 401, "Unauthorized");
    }
  },

  changeProfile: async (user, nickName, intro) => {
    const updatedUser = await userRepository.findByEmailAndUpdate(user.email, {
      nickName: nickName,
      intro: intro,
    });
    return updatedUser;
  },

  searchInfo: async (userName) => {
    const user = await userRepository.findByName(userName);
    const followsCount = await followRepository.findFollowsCountById(user.id);
    const followersCount = await followRepository.findFollowersCountById(
      user.id
    );
    return {
      userEmail: user.email,
      follows: followsCount,
      followers: followersCount,
      userName: user.name,
      userIntro: user.intro,
      // TODO => add user`s profile uri
      // TODO => add user`s trip list
    };
  },
});

module.exports = userService;
