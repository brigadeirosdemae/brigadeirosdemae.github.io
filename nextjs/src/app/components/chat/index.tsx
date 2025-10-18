'use client'

import { FormEvent, useEffect, useRef, useState } from "react";
import { Chat as GoogleGenaiChat, GoogleGenAI } from "@google/genai";
import { marked } from "marked";

import prompt from "./prompt";
import { ProductDatabase, ProductManager } from "@/app/api/products";

interface ChatStatus {
  windowOpened: boolean,
  user: {
    name: string;
  }
  messages: {
    name: string;
    type: "user" | "bot",
    message: string;
  }[]
}

const ai = new GoogleGenAI({
  apiKey: 'AIzaSyDpTChfOyjpEgo-2pH4Q4SEAIFFrQJ7qE8'
});

const createChat = () => {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    history: []
  });
}

const IAInstructions = `Nossa histórioa: Deixa eu contar um pouquinho da nossa história pra vocês. Tudo começou em 2017, quando me mudei para o Rio de Janeiro para cursar Serviço Social na UFF. Foi lá que conheci o Gabriel, meu companheiro e amor da minha vida.
Depois de quase dois anos, a situação financeira apertou e precisei largar a faculdade. Voltei para São Paulo com o coração partido, me sentindo completamente derrotada, e claro, trouxe o Gabriel comigo. Uma semana depois, descobri que estava grávida do nosso filho, Arthur! Imagina a loucura: nós dois desempregados, morando com a minha mãe.
O Gabriel logo conseguiu um emprego, mas eu, grávida, precisava encontrar um jeito de ter minha independência financeira e ajudar com as despesas e o enxoval. Foi aí que minha mãe sugeriu que eu vendesse brigadeiros. Em outubro de 2019, mergulhei de cabeça: criei a página Brigadeiros de Mãe e, mesmo sem experiência nenhuma, comecei a produzir.
Um tempo depois, veio a segunda gravidez, e com ela um grande desânimo após as vendas fracas de um Natal. Cheguei a abandonar o negócio por seis meses, achando que nunca daria certo. Mas, num impulso, decidi voltar com tudo, só que dessa vez com uma nova mentalidade: fazer diferente, estudar, ter paciência e entender que cada um tem seu próprio tempo para crescer.
Hoje, sigo em frente, muito mais confiante e determinada a construir a minha história, dando um passo de cada vez e fazendo a Brigadeiros de Mãe florescer.
Hoje, só estamos trabalhando online comprodutos e encomenda. Nosso PIX: brigadeirodemae0@gmail.com, nosso whtasapp: 5511954987213`

export const Chat = () => {

  const [IAChat, setIAChat] = useState<GoogleGenaiChat>();
  const [catalogo, setCatalogo] = useState<ProductDatabase>();

  useEffect(() => {
    if (!IAChat) {
      setIAChat(createChat());
    }

    ProductManager.fetch().then(pm => {
      if (ProductManager.data)
        setCatalogo(ProductManager.data);
    });


  }, []);

  const [status, setStatus] = useState<ChatStatus>({
    windowOpened: false,
    user: {
      name: "João"
    },
    messages: [
    ]
  });

  const [inputText, setInputText] = useState<string>("");

  const open = async () => {


    IAChat?.sendMessage({
      message: "", config: {
        systemInstruction: `Estamos iniciando uma conversa com um possível cliente da Brigadieros de Mãe doces. Você é agora é a opearadora Virtual Ray, 
        e vai antender esse possível cliente. Apresente-se.
        Aproveite o início da conversa para já solicitar os dados iniciais do cliente. Nome, e-mail e telefone.` + IAInstructions + 
        `Nosso catálogo de produtos: ${ JSON.stringify(catalogo) }`
      }}
    ).then(async response => {
      setStatus({...status,
        windowOpened: true, 
        messages: [...status.messages, {
          message: await marked.parse(response.text || "") , 
          name: 'Ray',
          type: 'bot'
        }]
      })
    });
  }

  const close = () => {
    setStatus({
      ...status,
      windowOpened: false
    });
  }

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const data = event.currentTarget.value;
    setInputText(data);
  }

  const messageWindow = useRef<HTMLDivElement>(null);

  const addMessage = async () => {
    if (!inputText.length ) {
      return;
    }

    setStatus({...status, 
      messages: [...status.messages, {
        message: inputText,
        name: status.user.name,
        type: 'user'
      }]
    })
    setInputText("");

    setTimeout(() => {
      if (messageWindow.current) {
        messageWindow?.current?.scroll({top: messageWindow?.current?.scrollHeight, left: 0, behavior: "smooth"});
      }
    }, 200);

    IAChat?.sendMessage({
      message: inputText, config: {
        systemInstruction: `Tente ser suscinto na resposta, caso precise de muitos dados para continuar atendendo, escolhe a primeira pergunta mais importante, e deois continue 
        fazendo as perguntas conforme necessário.` + IAInstructions + 
        `Nosso catálogo de produtos: ${JSON.stringify(catalogo)}`
      }
    }).then(async response => {
      setStatus({...status,
        windowOpened: true, 
        messages: [...status.messages, 
          {
            message: inputText,
            name: status.user.name,
            type: 'user'
          },
          {
          message: await marked.parse(response.text || ""), 
          name: 'Ray',
          type: 'bot'
        }]
      })
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

        <div className="flex-1 p-4 overflow-y-auto h-full h-60 max-h-64" ref={ messageWindow }>

          { status.messages.map((message, i) => <div key={ i } className={`${message.type === 'bot'? 'bg-green-100': 'bg-blue-100'} my-2 p-3 rounded-lg w-fit`}>
              <p className="text-sm"  dangerouslySetInnerHTML={{__html: message.message}}></p>
            </div>)}

        </div>

        <div className="p-2 border-t bg-gray-50 rounded-b-lg">
          <div className="flex">
            <input 
              id="chat-input" 
              type="text" 
              placeholder="Digite sua mensagem..." 
              className="flex-1 border rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent" 
              onInput={ onInput }
              onKeyPress={ evt => {
                if (evt.key === 'Enter') {
                  addMessage();
                }
              }}
              value={ inputText }
            />
            <button id="send-chat-btn" className="bg-brand-accent text-white rounded-r-full px-4 py-2 font-bold hover:bg-orange-600"
              onClick={ addMessage }
            >
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