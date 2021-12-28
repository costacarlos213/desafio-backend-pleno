"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoviePuller = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

class MoviePuller {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute() {
    const today = _dayjs.default.utc().set("hour", 23).set("minute", 59).set("second", 59).format();

    const stoppedPlayingMovies = await this.movieRepository.get({
      stopsPlaying: today,
      hasStoppedPlaying: false
    });
    stoppedPlayingMovies.forEach(async movie => {
      await this.movieRepository.update({
        id: movie.id_movie,
        fields: {
          hasStoppedPlaying: true
        }
      });
    });
  }

}

exports.MoviePuller = MoviePuller;