const { EntitySchema } = require("typeorm");

class User {
  constructor(
    userId,
    profileId,
    nickName,
    userName,
    password,
    role,
    phoneNumber,
    email,
    createdDate,
    updatedDate
  ) {
    this.user_id = userId;
    this.profile_id = profileId;
    this.nickname = nickName;
    this.user_name = userName;
    this.password = password;
    this.role = role;
    this.phone_number = phoneNumber;
    this.email = email;
    this.created_at = createdDate;
    this.updated_at = updatedDate;
  }
}
const userSchema = new EntitySchema({
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

module.exports = { User, userSchema };
