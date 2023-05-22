const followService = (followRepository, AppError, commonErrors, logger) => ({
  follow: async (userName, targetName) => {
    const userId = await followRepository.findUserIdByUserName(userName);
    const targetId = await followRepository.findUserIdByUserName(targetName);
    await followRepository.addFollowById(userId, targetId);
  },

  unfollow: async (userName, targetName) => {
    const userId = await followRepository.findUserIdByUserName(userName);
    const targetId = await followRepository.findUserIdByUserName(targetName);
    await followRepository.removeFollowById(userId, targetId);
  },

  searchFollowsCount: async (userName) => {
    const userId = await followRepository.findUserIdByUserName(userName);
    const datas = await followRepository.findFollowersAndCountById(userId);
    return datas;
  },

  searchFollowersCount: async (userName) => {
    const userId = await followRepository.findUserIdByUserName(userName);
    const datas = await followRepository.findFollowsCountById(userId);
    return datas;
  },
});

module.exports = followService;
