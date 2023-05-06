const { buildResponse } = require("../util/response/buildResponse");
const sampleService = require("./sampleService");

// 예시 코드
const sampleController = {
  async postSample(req, res, next) {
    try {
      const sampleData = req.body;
      const post = sampleService.create(sampleData);
      res.status(200).json(buildResponse(post));
    } catch (error) {
      next(error);
    }
  },
};
