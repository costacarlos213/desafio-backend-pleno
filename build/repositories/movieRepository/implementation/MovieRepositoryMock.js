"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieRepositoryMock = void 0;

class MovieRepositoryMock {
  save() {
    return new Promise(resolve => resolve({
      id: 2
    }));
  }

  get() {
    return new Promise(resolve => resolve([{
      has_stopped_playing: false,
      id_movie: 1,
      img_url: "http://img.url.com/img.jpg",
      kind: "Cartoon",
      name: "Kung fu panda 3",
      release: "2021-12-27T17:37:34+0000",
      stops_playing: "2022-02-28T17:37:34+0000"
    }, {
      has_stopped_playing: false,
      id_movie: 2,
      img_url: "http://img.url.com/img.jpg",
      kind: "Action",
      name: "Missão: Impossível",
      release: "2021-12-27T17:37:34+0000",
      stops_playing: "2022-02-28T17:37:34+0000"
    }, {
      has_stopped_playing: true,
      id_movie: 3,
      img_url: "http://img.url.com/img.jpg",
      kind: "Cartoon",
      name: "Kung fu panda",
      release: "2021-12-27T17:37:34+0000",
      stops_playing: "2022-02-28T17:37:34+0000"
    }]));
  }

  update() {
    return new Promise(resolve => {
      resolve({
        has_stopped_playing: false,
        id_movie: 1,
        img_url: "http://img.url.com/img.jpg",
        kind: "Fantasy",
        name: "Kung fu panda",
        release: "2021-12-27T17:37:34+0000",
        stops_playing: "2022-02-28T17:37:34+0000"
      });
    });
  }

  delete(id) {
    return new Promise(resolve => resolve({
      id
    }));
  }

}

exports.MovieRepositoryMock = MovieRepositoryMock;