import express, { json } from "express"
import dotenv from "dotenv"

import { router } from "./routes"

const app = express()

dotenv.config()

app.use(json())
app.use(router)

export { app }
