"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _uuid = require("uuid");

class User {
  constructor(Role, Username, Password, Id, JID) {
    this.Role = Role;
    this.Username = Username;
    this.Password = Password;
    this.Id = Id;
    this.JID = JID;

    if (!Id) {
      this.Id = (0, _uuid.v4)();
    }
  }

  static create(user) {
    const {
      username,
      role,
      password,
      id,
      JID
    } = user;
    this.validade(user);
    return new User(role, username, password, id, JID);
  }

  static validade(user) {
    if (!user.username || user.username === "") {
      throw new Error("Username can't be blank.");
    }

    Object.keys(user).forEach(key => {
      if (user[key]?.length > 255) {
        throw new Error(`${key} is too long.`);
      }
    });
  }

}

exports.User = User;