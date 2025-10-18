'use client'

import { useState } from "react";

interface ChatStatus {
  windowOpened: boolean,
  messages: {
    name: string;
    type: "user" | "bot",
    message: string;
  }[]
}

export const Chat = () => {

  const [status, setStatus] = useState<ChatStatus>({
    windowOpened: false,
    messages: [
      {
        message: "Olá, Como podemos te ajudar hoje?",
        name: "Ray",
        type: 'bot'
      },
      {
        message: "Gostaria de saber sobre seus produtos",
        name: "João",
        type: 'user'
      },

    ]
  });

  const open = () => {
    setStatus({
      ...status,
      windowOpened: true
    });
  }

  const close = () => {
    setStatus({
      ...status,
      windowOpened: false
    });
  }

  return <>
    <button onClick={ open } id="open-chat-btn" className="fixed bottom-6 left-6 bg-brand-dark text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl z-40 transform hover:scale-110 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"></path>
      </svg>
    </button>

    <div className={`fixed bottom-24 left-6 w-80 bg-white rounded-lg shadow-2xl z-40 ${!status.windowOpened && "hidden"} flex-col transition-all duration-300`}>

      <div className="d-flex flex-row h-full">
        <div className="bg-brand-dark text-white p-3 rounded-t-lg flex justify-between items-center">
          <h3 className="font-bold text-sm">Atendimento Online</h3>
          <button id="close-chat-btn" className="text-xl leading-none" onClick={ close }>&times;</button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto h-full h-60">

          { status.messages.map((message, i) => <div key={ i } className={`bg-gray-${message.type === 'bot'? '100': '200'} p-3 rounded-lg ${message.type === 'bot'? 'self-start': 'self-end'} w-fit max-w-52`}>
              <p className="text-sm">{ message.message }</p>
            </div>)}

        </div>

        <div className="p-2 border-t bg-gray-50 rounded-b-lg">
          <div className="flex">
            <input id="chat-input" type="text" placeholder="Digite sua mensagem..." className="flex-1 border rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent" />
              <button id="send-chat-btn" className="bg-brand-accent text-white rounded-r-full px-4 py-2 font-bold hover:bg-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
          </div>
        </div>
      </div>
    </div>
  </>
}