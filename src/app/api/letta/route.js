import { NextResponse } from 'next/server'


export async function POST(req) {
  const body = await req.json();

  // Debug: 打印收到的 body
  console.log('[API] /api/letta 接收到 body:', body);

  // 若你的 agentId 放前端传了（你的 page.jsx 已有），这里会带着 agentId
  const response = await fetch('https://api.letta.com/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LETTA_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  // Debug: 打印 HTTP 状态码
  console.log('[API] Letta response status:', response.status);

  const data = await response.json();

  // Debug: 打印 Letta 返回内容
  console.log('[API] Letta 返回内容:', JSON.stringify(data, null, 2));

  return Response.json(data);
}
