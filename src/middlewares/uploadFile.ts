import multer from "multer"
import util from "util"

import { multerConfig } from "@config/multer/multer"

const uploadFile = multer(multerConfig).any()

export const uploadFileMiddleware = util.promisify(uploadFile)
