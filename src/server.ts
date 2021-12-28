import { app } from "./app"
import { moviePullerTask } from "./main/movieCron"

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`server is running on port ${process.env.SERVER_PORT || 3000}`)

  moviePullerTask.start()
  console.log("Stopped playing movies puller service is ready")
})
