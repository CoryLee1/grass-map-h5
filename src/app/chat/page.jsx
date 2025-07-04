'use client'
import { useRef, useState, useEffect } from "react"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "你好，我是 Letta，随时等你聊天哦！" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  // 自动滚动到底部
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 发送消息
  async function sendMessage(e) {
    e.preventDefault()
    const userInput = input.trim()
    if (!userInput || loading) return
    setMessages(prev => [...prev, { role: "user", content: userInput }])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", { // 这里已改为新的接口
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "agent-10574e0c-dc8d-4df7-b6ef-167b8c536393", // 直接填你的 agentId
          messages: [
            ...messages,
            { role: "user", content: userInput }
          ]
        }),
      })
      const data = await res.json()
      // 兼容 Letta 官方返回格式
      let reply = ""
      if (data.choices?.[0]?.message?.content) reply = data.choices[0].message.content
      else if (data.content) reply = data.content
      else if (data.text) reply = data.text
      else reply = "抱歉，Letta 没有回复。"

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: reply }
      ])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "😥 抱歉，出错了，请稍后再试！" }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-md mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Letta Chatbot</h1>
      <div className="bg-gray-50 p-4 rounded min-h-[300px] mb-4 shadow">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              "mb-2 flex " +
              (m.role === "user" ? "justify-end" : "justify-start")
            }
          >
            <div
              className={
                "px-3 py-2 rounded-lg " +
                (m.role === "user"
                  ? "bg-blue-200 text-right"
                  : "bg-green-100 text-left")
              }
              style={{ maxWidth: "80%" }}
            >
              <span className="block font-semibold text-xs mb-1">
                {m.role === "user" ? "我" : "Letta"}
              </span>
              <span>{m.content}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm italic text-gray-400 text-left">Letta 正在思考…</div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border rounded p-2 focus:outline-blue-300"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={loading ? "Letta 回复中…" : "请输入你的问题"}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading || !input.trim()}
        >
          发送
        </button>
      </form>
    </main>
  )
}
