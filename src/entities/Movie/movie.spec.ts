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
      Movie.validate({
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
      Movie.validate({
        name: "Kung fu panda",
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg",
        release: now,
        stopsPlaying: now
      })
    }).toThrowError()
  })

  test("No release and 'stops playing' date", () => {
    expect(() => {
      Movie.validate({
        name: "Kung fu panda",
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg"
      })
    }).not.toThrowError()
  })

  it("Should be able to use numbers and portuguese special chars in title", () => {
    const movie = Movie.create({
      name: "300: A ascenção do império",
      kind: "Ação",
      imgUrl: "http://img.url.com/img.jpg"
    })

    expect(movie.Name).toEqual("300: A ascenção do império")
    expect(movie.Kind).toEqual("Ação")
  })

  it("Should be able to remove special chars", () => {
    const movie = Movie.create({
      name: "M#i%¨*&ssã!o Im>po<ssí@vel()",
      kind: "Ação",
      imgUrl: "http://img.url.com/img.jpg"
    })

    expect(movie.Name).toEqual("Missão Impossível")
    expect(movie.Kind).toEqual("Ação")
  })
})
