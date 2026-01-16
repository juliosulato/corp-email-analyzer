const express = require("express");
const { EmailController } = require("@/controllers/email.controller");
const { upload } = require("@/middleware/multer");

const router = express.Router();

router.post("/classify", upload.single("email"), EmailController.classify);

export default router;
