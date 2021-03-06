import {
  IDatabaseUser,
  IUniqueFields,
  IUserRepository
} from "../IUserRepository"

class UserRepositoryMock implements IUserRepository {
  save(): Promise<{ id: string }> {
    return new Promise(resolve => resolve({ id: "1" }))
  }

  getUniqueUser({ username }: IUniqueFields): Promise<IDatabaseUser> {
    const hashPassword =
      "$2a$08$2qE6IT3xLdU58PpZdu2CUecb2aLUiSJlRhnblnPl246eGzNUyIb2u"

    if (username === "Joao") {
      return new Promise(resolve =>
        resolve({
          id_user: "1",
          jid: undefined,
          password: hashPassword, // 'strongpassword' through bcrypt
          role: "admin",
          username: "Joao"
        })
      )
    } else {
      return null
    }
  }

  update(): Promise<IDatabaseUser> {
    return new Promise(resolve =>
      resolve({
        id_user: "1",
        jid: "eyJhb.ey0IjoxNTE2MjM5MDIyfQ.SflKxwRyJV_adQssw5c",
        password: "strongpassword",
        role: "admin",
        username: "Joao"
      })
    )
  }
}

export { UserRepositoryMock }
