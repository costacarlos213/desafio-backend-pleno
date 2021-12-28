export interface IUser {
  id?: string
  username: string
  password?: string
  role: "admin" | "employee"
  JID?: string
}
