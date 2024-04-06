import {Message} from "@/app/api/messages/route";

import MessageForm from "@/app/(chat)/MessageForm";
import Messages from "@/app/(chat)/Messages";

const getMessages = async () => {
    const res = await fetch('http://localhost:3000/api/messages', {
        cache: 'no-store'
    })

    if (!res.ok) throw new Error('Fetch Error')

    const json = await res.json()
    return json.messages as Message[]
}

export default async function Home() {
    const messages = await getMessages()

    return (
        <main className="flex min-h-screen justify-center">
            <div className="w-2/3 relative">
                <div className="py-10 mb-14">
                    <Messages messages={messages}/>
                </div>
                <div className="absolute w-full bottom-0 pb-5">
                    <hr className="border-gray-300"/>
                    <MessageForm messages={messages}/>
                </div>
            </div>
        </main>
    )
}
