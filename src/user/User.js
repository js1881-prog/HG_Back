class User {
  constructor(nickName, userName, password, role, phoneNumber, email, intro) {
    this.id = null;
    this.nickname = nickName;
    this.userName = userName;
    this.password = password;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.intro = intro;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }
}

class UserBuilder {
  constructor() {
    this.nickName = null;
    this.userName = null;
    this.password = null;
    this.role = null;
    this.phoneNumber = null;
    this.email = null;
    this.intro = null;
  }

  setNickName(nickName) {
    this.nickName = nickName;
    return this;
  }

  setUserName(userName) {
    this.userName = userName;
    return this;
  }

  setPassword(password) {
    this.password = password;
    return this;
  }

  setRole(role) {
    this.role = role;
    return this;
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;
    return this;
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  setIntro(intro) {
    this.intro = intro;
    return this;
  }

  build() {
    return new User(
      this.nickName,
      this.userName,
      this.password,
      this.role,
      this.phoneNumber,
      this.email,
      this.intro
    );
  }
}

module.exports = { User, UserBuilder };
