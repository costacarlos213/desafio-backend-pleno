import { app } from "../../app"
import request from "supertest"
import dayjs from "dayjs"

describe("Create Movie Controller", () => {
  it("Should be able to create new movie", async () => {
    const response = await request(app).post("/movie").send({
      name: "Kung fu panda",
      kind: "Cartoon",
      imgUrl: "http://img.url.com/img.jpg"
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("Id")
  })

  it("Should be able to create new movie with all params", async () => {
    const response = await request(app)
      .post("/movie")
      .send({
        name: "Kung fu panda",
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg",
        release: dayjs().toISOString(),
        stopsPlaying: dayjs().add(1, "month").toISOString()
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("Id")
  })

  it("Should not be able to create movie without name", async () => {
    const response = await request(app).post("/movie").send({
      kind: "Cartoon"
    })

    expect(response.status).toBe(400)
  })

  it("Should not be able to create movie without kind", async () => {
    const response = await request(app).post("/movie").send({
      name: "Kung fu panda"
    })

    expect(response.status).toBe(400)
  })
})
