const searchService = require("./searchService");
const buildResponse = require("../util/response/buildResponse");

const searchController = {
  async getSearch(req, res, next) {
    try {
      const { keyword, page, limit } = req.query;

      const pageNumber = page ? parseInt(page) : 1;
      const limitNumber = limit ? parseInt(limit) : 10;

      const searchResult = await searchService.search(
        keyword,
        pageNumber,
        limitNumber
      );
      res.status(200).json(buildResponse(searchResult));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = searchController;
