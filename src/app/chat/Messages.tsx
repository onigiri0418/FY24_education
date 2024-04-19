import {Message, Role} from "@/app/api/messages/route";

type Props = {
    messages: Message[]
}

export default function Messages({messages}: Props) {
    return (
        <ul className="scroll space-y-4">
            {messages.map((message) => (
                message.role === Role.Assistant
                    ? <li className="flex justify-start" key={message.id}>
                        <div className="px-4 py-2 text-gray-700 bg-white rounded shadow">
                            <pre className="whitespace-pre-wrap">{message.content}</pre>
                        </div>
                    </li>
                    : <li className="flex justify-end" key={message.id}>
                        <div className="px-4 py-2 text-gray-900 bg-gray-300 rounded shadow">
                            <pre className="whitespace-pre-wrap">{message.content}</pre>
                        </div>
                    </li>
            ))}
        </ul>
    );
}
