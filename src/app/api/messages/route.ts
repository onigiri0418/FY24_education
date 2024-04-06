import {NextResponse} from "next/server";

export const Role = {
    Assistant: 'assistant',
    User: 'user'
} as const

export type Message = {
    id: number
    content: string
    role: typeof Role[keyof typeof Role]
}

// メモリ上にチャット履歴を保持する。
const messages: Message[] = []

// GET /api/messagesにマッピングされる
export async function GET() {
    return NextResponse.json({messages: messages})
}

// POST /api/messagesにマッピングされる
export async function POST(req: Request) {
    // 入力内容の取得
    const {message: userMessageContent} = await req.json()

    //返却する値を固定で準備
    const assistantMessageContent = "これは卵です"

    // メモリ上のチャット履歴にメッセージを追加
    const userMessage = {
        id: messages.length + 1,
        content: userMessageContent,
        role: Role.User
    }
    messages.push(userMessage)
    const assistantMessage = {
        id: messages.length + 1,
        content: assistantMessageContent,
        role: Role.Assistant
    }
    messages.push(assistantMessage)

    return new Response()
}