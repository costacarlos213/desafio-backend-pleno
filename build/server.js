"use strict";

var _app = require("./app");

var _movieCron = require("./main/movieCron");

_app.app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`server is running on port ${process.env.SERVER_PORT || 3000}`);

  _movieCron.moviePullerTask.start();

  console.log("Stopped playing movies puller service is ready");
});