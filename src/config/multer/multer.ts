import multer from "multer"
import path from "path"
import { v4 } from "uuid"
import aws from "aws-sdk"
import multerS3 from "multer-s3"
import { Request } from "express"

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "public", "uploads"))
    },

    filename: (req, file, cb) => {
      const fileName = `${v4()}@${file.originalname}`

      return cb(null, fileName)
    }
  }),
  s3: multerS3({
    s3: new aws.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
      },
      region: process.env.AWS_DEFAULT_REGION
    }),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      const fileName = `${v4()}@${file.originalname
        .replace(" ", "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")}`

      return cb(null, fileName)
    }
  })
}

export const multerConfig = {
  dest: path.resolve(__dirname, "..", "public", "uploads"),
  storage: storageTypes.s3,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error, isValid: boolean) => void
  ): void => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
      "image/jpg"
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type."), null)
    }
  }
}
