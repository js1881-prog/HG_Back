const typeORMDataSource = require("../util/connect/typeorm");
const sampleSchema = require("../entities/sample.entity");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

// 예시 코드
const sampleRepository = {
  async create(sampleData) {
    try {
      const sampleRepository = typeORMDataSource.getRepository(sampleSchema);
      const sample = sampleRepository.create(sampleData);
      return await sampleRepository.save(sample);
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
};

module.exports = sampleRepository;
