import dayjs from "dayjs"
import { Movie } from "./Movie"

describe("Create new movie tests", () => {
  test("New Movie", () => {
    expect(() => {
      Movie.create({
        name: "Kung fu panda",
        kind: "Cartoon",
        release: dayjs().toISOString(),
        stopsPlaying: dayjs().add(1, "month").toISOString()
      })
    }).not.toThrowError()
  })

  test("Too long name", () => {
    let name: string

    for (let i = 0; i < 256; i++) {
      name += "a"
    }

    expect(() => {
      Movie.create({
        name,
        kind: "Cartoon",
        release: dayjs().toISOString(),
        stopsPlaying: dayjs().add(1, "month").toISOString()
      })
    }).toThrowError()
  })

  test("Same release and stops playing date", () => {
    expect(() => {
      Movie.create({
        name: "Kung fu panda",
        kind: "Cartoon",
        release: dayjs().toISOString(),
        stopsPlaying: dayjs().toISOString()
      })
    }).toThrowError()
  })
})
