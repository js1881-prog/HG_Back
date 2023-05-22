const searchService = require("./searchService");
const buildResponse = require("../util/response/buildResponse");

const searchController = {
  async getSearch(req, res, next) {
    try {
      const { keyword } = req.query;
      const searchResult = await searchService.search(keyword);
      res.status(200).json(buildResponse(searchResult));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = searchController;
