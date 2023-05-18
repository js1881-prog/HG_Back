/**
 * authService,
 * @param {User} User - The User class.
 * @param {UserBuilder} UserBuilder - The UserBuilder class.
 * @param {Object} userRepository - The user repository object.
 * @param {Function} AppError - The AppError class.
 * @param {Object} commonErrors - The commonErrors object.
 * @param {Object} logger - The logger object.
 * @returns {Object} The auth service object.
 */
const authService = (
  User,
  UserBuilder,
  userRepository,
  AppError,
  commonErrors,
  logger,
  hashPassword
) => ({
  /**
   * Changes the password for a user with the provided email.
   * @param {string} email - The email of the user.
   * @param {string} password - The new password.
   * @returns {Promise<User>} The updated user object.
   */
  changePassword: async (email, password) => {
    const hashedPassword = await hashPassword(password);
    const updatedUser = await userRepository.findByEmailAndUpdate(email, {
      password: hashedPassword,
    });
    return updatedUser;
  },

  /**
   * Searches for a user's username by their email.
   * @param {string} email - The email of the user.
   * @returns {Promise<{ userName: string }>} The user's username.
   */
  searchUserName: async (email) => {
    const user = await userRepository.findByEmail(email);
    return { userName: user.userName };
  },
});

module.exports = authService;
