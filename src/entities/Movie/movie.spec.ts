import dayjs from "dayjs"
import { Movie } from "./Movie"

describe("Create new movie tests", () => {
  test("New Movie", () => {
    expect(
      Movie.create({
        name: "Kung fu panda",
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg",
        release: dayjs().toISOString(),
        stopsPlaying: dayjs().add(1, "month").toISOString()
      })
    ).toBeInstanceOf(Movie)
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
        imgUrl: "http://img.url.com/img.jpg",
        release: dayjs().toISOString(),
        stopsPlaying: dayjs().add(1, "month").toISOString()
      })
    }).toThrowError()
  })

  test("Same release and stops playing date", () => {
    const now = dayjs().toISOString()

    expect(() => {
      Movie.create({
        name: "Kung fu panda",
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg",
        release: now,
        stopsPlaying: now
      })
    }).toThrowError()
  })

  test("Same release and stops playing date", () => {
    expect(() => {
      Movie.create({
        name: "Kung fu panda",
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg",
        release: dayjs().toISOString(),
        stopsPlaying: dayjs().toISOString()
      })
    }).toThrowError()
  })

  test("No release and 'stops playing' date", () => {
    expect(() => {
      Movie.create({
        name: "Kung fu panda",
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg"
      })
    }).not.toThrowError()
  })
})
