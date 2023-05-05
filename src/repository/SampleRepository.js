const typeORMDataSource = require("../util/connect/typeorm");
const SampleSchema = require("../entities/sample.entity");

// 예시 코드
class SampleRepository {
  async create(sampleData) {
    const sampleRepository = typeORMDataSource.getRepository(SampleSchema);
    const sample = sampleRepository.create(sampleData);
    return sampleRepository.save(sample);
  }
}

module.exports = SampleRepository;
