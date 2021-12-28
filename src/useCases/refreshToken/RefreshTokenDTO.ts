export interface IRefreshTokenDTO {
  refreshToken: string
  userId: string
  role: "admin" | "employee"
}
