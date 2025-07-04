import { NextRequest } from 'next/server'
import { lettaMiddleware } from '@letta-ai/letta-nextjs/server'

export function middleware(request: NextRequest) {
  const res = lettaMiddleware(request, {
    baseUrl: process.env.LETTA_BASE_URL,
    apiKey: process.env.LETTA_API_KEY,
  })
  if (res) return res
}

export const config = { matcher: ['/((?!api|_next).*)'] }
