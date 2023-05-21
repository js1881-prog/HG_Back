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
  AppError,
  commonErrors,
  logger,
  hashPassword,
  comparePassword
) => ({
  /**
   * Sign up a new user.
   * @param {UserDTO} userDTO - The user data transfer object.
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

  login: async (name, password) => {
    const checkUser = await userRepository.findByName(name);

    if (!checkUser) {
      throw new AppError(commonErrors.authenticationError, 401, "Unauthorized");
    }
    const isMatch = comparePassword(password, checkUser.password);

    if (isMatch) {
      return checkUser;
    } else {
      throw new AppError(commonErrors.authenticationError, 401, "Unauthorized");
    }
  },
});

module.exports = userService;
