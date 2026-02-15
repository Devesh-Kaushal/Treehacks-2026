"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User as UserIcon, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
    { label: "Evacuation Plan", query: "What's the best evacuation route from my location?" },
    { label: "Home Hardening", query: "How can I protect my roof from embers?" },
    { label: "Emergency Kit", query: "What should I pack in my go-bag?" },
    { label: "Current Risk", query: "Is there any active fire risk today?" },
];

export function ChatScreen() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: `Hello ${user?.name || "there"}! I'm your Resonant Safety Advisor. I see you're a **${user?.profileType?.replace(/_/g, " ") || "resident"}** in **${user?.city || "your area"}**. How can I help you prepare today?`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            timestamp: new Date()
        };

        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        try {
            // Prepare messages for API (strip IDs and timestamps, and filter out initial welcome message)
            const apiMessages = newMessages
                .filter(m => m.id !== "welcome") // Filter out the local-only welcome message
                .map(m => ({
                    role: m.role,
                    content: m.content
                }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: apiMessages,
                    userProfile: user
                })
            });

            if (!response.ok) throw new Error("Failed to get response");

            const data = await response.json();
            const aiContent = data.choices[0].message.content;

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: aiContent,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I'm having trouble connecting to the safety network right now. Please try again or check official emergency channels.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6 flex-shrink-0"
            >
                <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl shadow-lg shadow-violet-500/20">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-display font-bold text-forest-900">
                        Safety Advisor
                    </h1>
                    <p className="text-gray-500 font-medium">
                        AI-powered guidance for {user?.city || "your community"}
                    </p>
                </div>
            </motion.div>

            {/* Chat Container */}
            <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col relative">
                {/* Decoration */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-fire-500" />

                {/* Messages Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50"
                >
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={clsx(
                                "flex gap-4 max-w-3xl",
                                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                            )}
                        >
                            {/* Avatar */}
                            <div className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                msg.role === "assistant"
                                    ? "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white"
                                    : "bg-white border border-gray-200 text-gray-600"
                            )}>
                                {msg.role === "assistant" ? <Bot className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
                            </div>

                            {/* Bubble */}
                            <div className={clsx(
                                "p-5 rounded-2xl shadow-sm leading-relaxed relative",
                                msg.role === "assistant"
                                    ? "bg-white border border-gray-100 text-gray-700 rounded-tl-none"
                                    : "bg-forest-900 text-white rounded-tr-none"
                            )}>
                                {msg.role === "assistant" ? (
                                    <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-white">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                ul: ({ node: _node, ...props }) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                                                ol: ({ node: _node, ...props }) => <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />,
                                                li: ({ node: _node, ...props }) => <li className="pl-1" {...props} />,
                                                a: ({ node: _node, ...props }) => <a className="text-violet-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                                                strong: ({ node: _node, ...props }) => <span className="font-bold text-gray-900" {...props} />,
                                                h1: ({ node: _node, ...props }) => <h1 className="text-lg font-bold my-2" {...props} />,
                                                h2: ({ node: _node, ...props }) => <h2 className="text-base font-bold my-2" {...props} />,
                                                h3: ({ node: _node, ...props }) => <h3 className="text-sm font-bold my-1" {...props} />,
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                code: ({ node: _node, className, children, ...props }: any) => {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    return !match ? (
                                                        <code className="bg-gray-100 text-pink-600 px-1 py-0.5 rounded text-xs font-mono" {...props}>
                                                            {children}
                                                        </code>
                                                    ) : (
                                                        <div className="relative my-2">
                                                            <code className={clsx("block bg-gray-900 text-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto", className)} {...props}>
                                                                {children}
                                                            </code>
                                                        </div>
                                                    );
                                                },
                                                table: ({ node: _node, ...props }) => <div className="overflow-x-auto my-2"><table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg" {...props} /></div>,
                                                thead: ({ node: _node, ...props }) => <thead className="bg-gray-50" {...props} />,
                                                th: ({ node: _node, ...props }) => <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />,
                                                tbody: ({ node: _node, ...props }) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
                                                tr: ({ node: _node, ...props }) => <tr {...props} />,
                                                td: ({ node: _node, ...props }) => <td className="px-3 py-2 text-sm text-gray-500" {...props} />,
                                                blockquote: ({ node: _node, ...props }) => <blockquote className="border-l-4 border-violet-200 pl-4 italic text-gray-600 my-2" {...props} />,
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                )}
                                <span className={clsx(
                                    "text-[10px] font-bold mt-2 block opacity-50",
                                    msg.role === "assistant" ? "text-gray-400" : "text-gray-300"
                                )}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white flex items-center justify-center shadow-sm">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100" />
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200" />
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    {/* Suggested Questions */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                        {SUGGESTED_QUESTIONS.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(q.query)}
                                className="whitespace-nowrap px-4 py-2 bg-violet-50 text-violet-700 hover:bg-violet-100 rounded-xl text-sm font-semibold transition-colors border border-violet-100"
                            >
                                {q.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                            placeholder="Ask about fire safety, evacuation, or risk..."
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium"
                        />
                        <button
                            onClick={() => handleSend(input)}
                            disabled={!input.trim() || isTyping}
                            className={clsx(
                                "absolute right-2 p-2 rounded-xl transition-all",
                                input.trim() && !isTyping
                                    ? "bg-violet-600 text-white shadow-lg hover:bg-violet-700 hover:scale-105 active:scale-95"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            )}
                        >
                            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-gray-400 font-medium">
                            AI advice is for informational purposes. Always follow official emergency orders.
                        </p>
                    </div>
                </div>
            </div >
        </div >
    );
}
