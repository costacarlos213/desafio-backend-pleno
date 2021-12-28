"use strict";

var _UserRepositoryMock = require("../../repositories/userRepository/implementation/UserRepositoryMock");

var _LoginUserUseCase = require("./LoginUserUseCase");

describe("Login Use Case", () => {
  let loginUserUseCase;
  beforeAll(() => {
    const userRepository = new _UserRepositoryMock.UserRepositoryMock();
    loginUserUseCase = new _LoginUserUseCase.LoginUserUseCase(userRepository);
  });
  it("Should be able to login user", async () => {
    const tokens = await loginUserUseCase.execute({
      username: "Joao",
      password: "strongpassword"
    });
    expect(tokens).toHaveProperty("accessToken");
    expect(tokens).toHaveProperty("refreshToken");
  });
  it("Should not be able to login with no username", async () => {
    await expect(loginUserUseCase.execute({
      password: "strongpassword",
      username: undefined
    })).rejects.toEqual(new Error("Wrong credentials."));
  });
  it("Should not be able to login with unknown username", async () => {
    await expect(loginUserUseCase.execute({
      password: "strongpassword",
      username: "Marcos"
    })).rejects.toEqual(new Error("Wrong credentials."));
  });
  it("Should not be able to login with wrong password", async () => {
    await expect(loginUserUseCase.execute({
      password: "weekpassword",
      username: "Joao"
    })).rejects.toEqual(new Error("Wrong credentials."));
  });
});