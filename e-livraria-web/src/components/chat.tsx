'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react'
import { BookService } from "@/services/BookService";
import { ScrollArea } from "./ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import { Book } from "@/models/Book";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Fragment } from 'react';
import axios from 'axios';

interface Message {
    id: number;
    text: string;
    user: boolean;
}

interface ContextBook{
    id: number;
    title: string;
    category: string;
    image: string;
    link: string;
}

interface ChatProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function Chat({ isOpen, setIsOpen }: ChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [books, setBooks] = useState<ContextBook[]>([]);
    const bookService = new BookService()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await sendMessage();
    };

    const sendMessage = async () => {
        if (currentMessage.trim() === '') {
            return;
        }

        if (currentMessage.length > 150) {
            setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: 'Mensagem muito longa. Limite de 150 caracteres.', user: true }]);
            setCurrentMessage('');
            return;
        }

        const newMessage: Message = { id: Date.now(), text: currentMessage, user: true };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        const messagesData = messages.map(message => ({
            role: message.user ? 'user' : 'assistant',
            content: message.text
        }));

        const requestBody = {
            model: 'gpt-3.5-turbo',
            messages: [
                ...messagesData,
                {
                    role: 'user',
                    content: `${currentMessage} // CONTEXTO: A MENSAGEM ANTES DAS BARRAS (//) SÃO DE UM USUARIO DE UM E-COMMERCE DE LIVRARIA, ATUE COMO UM ASSISTENTE VIRTUAL DA LIVRARIA. NÃO RESPONDA PERGUNTAS QUE FUJAM DO TEMA DA LIVRARIA(LIVROS OU CATEGORIAS). ESTES SÃO OS LIVROS DISPONÍVEIS: ${JSON.stringify(books)}. UTILIZE-OS EXIBINDO SUAS IMAGENS E LINK PARA ELES COM NO MÁXIMO 1 LIVRO POR RESPOSTA. NÃO RESPONDA COM MENSAGENS LONGAS`                }
            ],
            max_tokens: 450,
            temperature: 0.7
        };
        
        function generateBookResponse(books:ContextBook[]) {
            return books.map(book => 
                `**"${book.title}"** - Categoria: ${book.category} \n` +
                `![${book.title}](${book.image} | width=100 | height=100) \n` +
                `[Comprar Agora](${book.link})`
            ).join('\n\n\n');
        }

        requestBody.messages.push({
            role: 'assistant',
            content: generateBookResponse(books)
        });

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
                headers: {
                    'Authorization': 'Bearer APY_KEY',  // Replace with your actual API key
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const botMessage = response.data.choices[0].message.content.trim();
                setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: botMessage, user: false }]);
            } else {
                setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: 'Erro ao obter resposta do ChatGPT.', user: false }]);
            }
        } catch (error) {
            console.error('Erro ao obter resposta do ChatGPT:', error);
            setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: 'Erro ao obter resposta do ChatGPT.', user: false }]);
        }

        setCurrentMessage('');
    };

    useEffect(() => {
        bookService.findAll()
            .then((response) => {
                const contextBooks: ContextBook[] = response.data.map((book: Book) => ({
                    id: book.id,
                    title: book.name,
                    category: book.categories.map(category => category.name).join(', '),
                    image: book.imageSrc,
                    link: `http://localhost:3000/book/shop/${book.id}`
                }));
                setBooks(contextBooks);
                console.log(contextBooks);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Chat AI</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            <ScrollArea className="w-[380px] h-[740px] pr-4">
                                                {messages.map((message, index) => {
                                                    return (
                                                        <div key={index} className="flex gap-3 text-slate-600 text-sm mb-4">
                                                            {message.user ? (
                                                                <Avatar>
                                                                    <AvatarFallback>NR</AvatarFallback>
                                                                    <AvatarImage />
                                                                </Avatar>
                                                            ) : (
                                                                <Avatar>
                                                                    <AvatarFallback>AI</AvatarFallback>
                                                                    <AvatarImage />
                                                                </Avatar>
                                                            )}
                                                            <div className="leading-relaxed">
                                                                <ReactMarkdown>{message.text}</ReactMarkdown>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </ScrollArea>
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <form className="w-full flex gap-2" onSubmit={handleSubmit}>
                                                <Input placeholder="How can I help you?" value={currentMessage} onChange={handleInputChange}></Input>
                                                <Button type="submit">Send</Button>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
