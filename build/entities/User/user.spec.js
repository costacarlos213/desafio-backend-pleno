"use strict";

var _User = require("./User");

describe("Create new user tests", () => {
  test("New user", () => {
    expect(() => {
      _User.User.create({
        role: "admin",
        username: "João",
        password: "joaozinho123"
      });
    }).not.toThrowError();
  });
  test("Too long username", () => {
    let username;

    for (let i = 0; i < 256; i++) {
      username += "a";
    }

    expect(() => {
      _User.User.create({
        role: "admin",
        username,
        password: "joaozinho123"
      });
    }).toThrowError();
  });
});