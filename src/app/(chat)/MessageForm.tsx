'use client'
import React, {createRef, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Message} from "@/app/api/messages/route";
//
type Props = {
    messages: Message[]
}

export default function MessageForm({messages}: Props){
    const router = useRouter()
    const formRef = createRef<HTMLFormElement>()

    const [message, setMessage] = useState<string>('')
    const [sending, setSending] = useState<boolean>(false)

    useEffect(() => {
        formRef?.current?.scrollIntoView({behavior: 'smooth'})
    },[messages])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (sending || message === '') return

        setSending(true)

        // メッセージの登録後全メッセージを再取得する
        await fetch('http://localhost:3000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message}),
        })

        router.refresh()

        setMessage('')
        setSending(false)
    }

    return (
        <form
            className="flex items-center justify-between w-full border-gray-300 my-3 space-x-3.5"
            onSubmit={handleSubmit}
            ref={formRef}
        >
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Message"
                className="block w-full py-2 px-4 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
            />
            {
                !sending
                    ? <button
                        type="submit"
                    >
                        <svg
                            className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                            />
                        </svg>
                    </button>
                    : <div className="animate-spin h-5 w-5 border-4 border-gray-700 rounded-full border-t-transparent"></div>
            }
        </form>
    );
}
