import { app } from "../../app"
import request from "supertest"

describe("Get Movies Controller", () => {
  it("Should return an array with all movies", async () => {
    const response = await request(app).get("/movie")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
  })
})
