// 검색 API 엔드포인트 처리
const searchService = require("./searchService");
const buildResponse = require("../util/response/buildResponse");

const searchController = {
  async getSearch(req, res, next) {
    try {
      const searchText = req.query.q;
      const searchResult = await searchService.search(searchText);
      res.status(200).json(buildResponse(searchResult));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = searchController;
