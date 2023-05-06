const sampleRepository = require("./sampleRepository");

// 예시 코드
const sampleService = {
  async sampleSignup(sampleData) {
    const createSample = sampleRepository.create(sampleData);
    return createSample;
  },
};

module.exports = sampleService;
