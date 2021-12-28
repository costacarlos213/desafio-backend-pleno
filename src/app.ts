import express, { json } from "express"
import * as dotenv from "dotenv"
import { router } from "./routes"
import path from "path"
import cookieParser from "cookie-parser"

const app = express()

dotenv.config()

app.use(cookieParser())

app.use("/files", express.static(path.join(__dirname, "/public/uploads")))

app.use(express.urlencoded({ extended: true }))

app.use(json())

app.use(router)

export { app }
