class User {
  constructor(
    id,
    nickName,
    userName,
    password,
    role,
    phoneNumber,
    email,
    intro,
    createdDate,
    updatedDate,
    deletedDate
  ) {
    this.id = id;
    this.nickname = nickName;
    this.user_name = userName;
    this.password = password;
    this.role = role;
    this.phone_number = phoneNumber;
    this.email = email;
    this.intro = intro;
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
    this.deleted_at = deletedDate || new Date();
  }
}

module.exports = User;
