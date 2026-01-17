import OpenAI from "openai";
import { env } from "@/config/env";
import { ClassificationResult } from "@/types/email.types";
import { HttpException } from "@/utils/http-exception";
import { simpleParser } from "mailparser";
import MsgReader from "msgreader";
const { PDFExtract } = require("pdf.js-extract");

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export class EmailService {
  static async classifyEmail(file: Express.Multer.File) {
    const service = new EmailService();
    const text = await service.emailParser(file);
    const processedText = await service.processText(text ?? "");
    const result = await service.openAiClassify(processedText);
    return result;
  }

  private async openAiClassify(
    emailText: string
  ): Promise<ClassificationResult> {
    const prompt = `
    Você é um assistente especializado em classificação de emails corporativos.
    
    Analise o email abaixo e retorne um objeto JSON com:
    1. "classification": 'Produtivo' (requer ação/resposta) ou 'Improdutivo' (social/agradecimento)
    2. "suggestedResponse": Uma resposta curta e profissional apropriada
    3. "confidence": Um número entre 0 e 1 indicando sua confiança

    Email:
    """
    ${emailText}
    """

    Retorne APENAS o objeto JSON, sem markdown ou explicações adicionais.
  `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("Empty response from OpenAI");

      return JSON.parse(content);
    } catch (error) {
      console.error("Error classifying email:", error);
      throw error;
    }
  }

  private async emailParser(file: Express.Multer.File) {
    const filename = file.originalname.toLowerCase();
    
    try {
      if (filename.endsWith(".eml")) {
        const parsed = await simpleParser(file.buffer);
        return parsed.text;
      }

      if (filename.endsWith(".msg")) {
        const reader = new MsgReader(file.buffer);
        const msgInfo = reader.getFileData();
        return msgInfo.body;
      }

      if (filename.endsWith(".txt")) {
        return file.buffer.toString("utf-8");
      }

      if (filename.endsWith(".pdf")) {
        const pdfExtract = new PDFExtract();
        const data = await pdfExtract.extractBuffer(file.buffer);
        
        // Extrai todo o texto de todas as páginas
        const text = data.pages
          .map((page: any) => 
            page.content
              .map((item: any) => item.str)
              .join(' ')
          )
          .join('\n');
        
        return text;
      }

      throw new HttpException(400, "Unsupported file format. Use .eml, .msg, .txt or .pdf");
    } catch (error) {
      console.error("Error parsing email file:", error);
      
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(400, `Error parsing ${filename}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async processText(text: string): Promise<string> {
    return text
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/[\r\n]/g, " ")
      .trim();
  }
}