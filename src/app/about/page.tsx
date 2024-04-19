'use client'
import React, {createRef, useEffect, useState} from "react";

function MainComponent() {
  const [showChat, setShowChat] = useState(false);
  const[showButton, setShowButton] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatMessages = document.cookie.replace(
      /(?:(?:^|.*;\s*)chatMessages\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (chatMessages) {
      setMessages(JSON.parse(chatMessages));
    }
  }, []);

  useEffect(() => {
    document.cookie = `chatMessages=${JSON.stringify(
      messages
    )};max-age=31536000;path=/;`;
  }, [messages]);

  const sendMessage = async (message:string) => {
    const response = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message}),
    });
    console.log(response);
    const data = await response.json();
    setMessages(data)
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,) => {
    sendMessage(e.currentTarget.value.trim());
    e.currentTarget.value = "";
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    handleSubmit(e)
  }

  const chatBoxStyle = `fixed bottom-0 right-0 m-4 w-[600px] h-[800px] bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden ${
    showChat ? "" : "hidden"
  }`;

  return (
    <>
      <button
        className="fixed bottom-1 right-0 m-4 p-3 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-600 z-50"
        onClick={() => {
          setShowChat(true);
          setShowButton(!showButton);
        }}
        hidden = {showButton}
      >
        💬
      </button>
      <div className={chatBoxStyle}>
      <div className="bg-[#f0f0f0] p-4 flex justify-between items-center font-roboto">
          <h2 className="text-[#121212] text-lg">Chat</h2>
          <button
            className="font-semibold text-lg p-2 rounded-full hover:bg-[#e0e0e0]"
            onClick={() => {
              setShowChat(false)
              setShowButton(!showButton);
            }}
          >
            ❌
          </button>
        </div>
        <ul className="overflow-auto h-[680px] p-4 space-y-2">
          {messages.map((message, index) => (
            <li key={index} className="break-words">
              {message}
            </li>
          ))}
        </ul>
        <div className="p-4 bg-[#f0f0f0]">
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="w-full border border-gray-300 p-2 rounded-md"
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
      </div>
    </>
  );
}

export default MainComponent;