class UserDTO {
  constructor(nickName, userName, password, role, phoneNumber, email, intro) {
    this.nickname = nickName;
    this.userName = userName;
    this.password = password;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.intro = intro;
  }
}

module.exports = UserDTO;
