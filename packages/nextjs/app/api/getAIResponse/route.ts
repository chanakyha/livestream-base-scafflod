import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const data = await request.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt =
    'convert them into a structured JSON format with the following fields: `amount`, `currency`, and an optional `superchat_message`. The format should look like this:  ```json{"amount":"amount""currency": "currency","superchat_message": "optional message"}``` The AI must ensure all fields are populated accurately based on the input, with the "superchat_message" included only if provided. If any required information is missing or incomplete, the AI should respond strictly with:   ```json (no result) ``` The AI must not respond to unrelated inputs, such as general greetings or casual statements, and should adhere strictly to this format and guideline.';

  const result = await model.generateContent([`${data.message}, ${prompt}`]);

  return NextResponse.json({
    result: result.response.text(),
    status: "success",
  });
}

export async function GET() {
  return NextResponse.json({
    status: "Working",
  });
}
