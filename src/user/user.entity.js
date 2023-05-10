const { EntitySchema } = require("typeorm");

class User {
  constructor(
    user_id,
    profile_id,
    nickname,
    user_name,
    password,
    role,
    phone_number,
    email,
    created_at,
    updated_at
  ) {
    this.user_id = user_id;
    this.profile_id = profile_id;
    this.nickname = nickname;
    this.user_name = user_name;
    this.password = password;
    this.role = role;
    this.phone_number = phone_number;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

const UserSchema = new EntitySchema({
  name: "User",
  tableName: "User",
  columns: {
    user_id: {
      primary: true,
      type: "bigint",
      generated: "increment",
    },
    profile_id: {
      type: "bigint",
    },
    nickname: {
      type: "varchar",
      nullable: false,
    },
    user_name: {
      type: "varchar",
      nullable: false,
    },
    password: {
      type: "varchar",
    },
    role: {
      type: "varchar",
      nullable: false,
    },
    phone_number: {
      type: "varchar",
      nullable: true,
    },
    email: {
      type: "varchar",
      nullable: false,
    },
    created_at: {
      type: "datetime",
    },
    updated_at: {
      type: "datetime",
    },
  },
  target: User, // User 클래스와 스키마를 연결
});

module.exports = { User, UserSchema };
