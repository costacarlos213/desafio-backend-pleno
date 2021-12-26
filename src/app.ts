import express from "express"
import dotenv from "dotenv"

import { router } from "./routes"

const app = express()

dotenv.config()

app.use(router)

export { app }
