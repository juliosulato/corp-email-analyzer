import multer from "multer";
import { HttpException } from "../utils/http-exception";

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = [
    "text/plain",
    "application/pdf",
    "message/rfc822",
    "application/vnd.ms-outlook",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new HttpException(
        400,
        "Formato de arquivo inválido. Use .eml, .msg, .txt ou .pdf"
      )
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
