"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movie = void 0;

class Movie {
  constructor(Name, Kind, ImageUrl, HasStoppedPlaying = false, StopsPlaying, Release, Id) {
    this.Name = Name;
    this.Kind = Kind;
    this.ImageUrl = ImageUrl;
    this.HasStoppedPlaying = HasStoppedPlaying;
    this.StopsPlaying = StopsPlaying;
    this.Release = Release;
    this.Id = Id;
  }

  static create(movie) {
    const {
      id,
      name,
      kind,
      stopsPlaying,
      hasStoppedPlaying,
      release,
      imgUrl
    } = movie;
    const escapedName = name?.replace(/[^a-zA-Z0-9:,.\-/ áàãâéêíõóúç]/g, "");
    const escapedKind = kind?.replace(/[^a-zA-Z0-9:,.\-/ áàãâéêíõóúç]/g, "");
    this.validate({ ...movie,
      name: escapedName,
      kind: escapedKind
    });
    return new Movie(escapedName, escapedKind, imgUrl, hasStoppedPlaying, stopsPlaying, release, id);
  }

  static validate(movie) {
    const {
      name,
      kind,
      stopsPlaying,
      release,
      imgUrl
    } = movie;

    if (!name || !kind || !imgUrl || name.length === 0 || kind.length === 0) {
      throw new Error("Missing movie name, kind or image url.");
    }

    Object.keys(movie).forEach(key => {
      if (movie[key]?.length > 255) {
        throw new Error(`Field ${key} is too long.`);
      }
    });

    if (release && stopsPlaying && release === stopsPlaying) {
      throw new Error(`Release date and "stops playing date" can't be the same`);
    }
  }

}

exports.Movie = Movie;