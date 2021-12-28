import express, { json } from "express"
import path from "path"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import { router } from "./routes"

const app = express()

dotenv.config()

app.use(cookieParser())

app.use("/files", express.static(path.join(__dirname, "/public/uploads")))

app.use(express.urlencoded({ extended: true }))

app.use(json())

app.use(router)

export { app }
