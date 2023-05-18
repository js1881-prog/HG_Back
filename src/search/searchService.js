// 실제 검색 로직
const searchRepository = require("./searchRepository");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const searchService = {
  async search(searchText) {
    try {
      const searchResult = await searchRepository.search(searchText);

      if (!searchResult) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Resource Not Found Error"
        );
      }

      return searchResult;
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

module.exports = searchService;
