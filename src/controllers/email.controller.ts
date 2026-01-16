import { Request, Response, NextFunction } from "express";
import { EmailService } from "@/services/email.service";
import { HttpException } from "@/utils/http-exception";

export class EmailController {
  static async classify(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new HttpException(400, "No file uploaded. Please attach a .eml, .msg, .txt or .pdf file.");
      }

      const result = await EmailService.classifyEmail(req.file);

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error); 
    }
  }
}
