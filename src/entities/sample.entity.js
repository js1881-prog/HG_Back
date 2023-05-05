const { EntitySchema } = require("typeorm");

// 예시 코드
class Sample {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const SampleSchema = new EntitySchema({
  name: "Sample",
  target: Sample,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
  },
});

module.exports = SampleSchema;
