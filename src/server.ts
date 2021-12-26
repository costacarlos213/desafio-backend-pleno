import { app } from "./app"

app.listen(process.env.SERVER_PORT || 3000, () =>
  console.log(`server is running on port ${process.env.SERVER_PORT || 3000}`)
)
