import { streamText } from 'ai';
import { lettaCloud } from '@letta-ai/vercel-ai-sdk-provider';

export const maxDuration = 30;



export async function POST(req: Request) {
    console.log("收到 POST /api/chat 请求")
    const body = await req.json();
    console.log("前端传来的内容:", body)
    return new Response(JSON.stringify({ reply: "收到啦" }), { status: 200 })
  }
  