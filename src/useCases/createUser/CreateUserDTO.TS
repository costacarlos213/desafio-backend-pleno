export interface ICreateUserDTO {
  username: string
  password: string
  role: "admin" | "employee"
  userRole: "admin" | "employee"
}
