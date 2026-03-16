'use client';

import { GridCloseIcon } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { AiOutlineRobot, AiOutlineUser } from 'react-icons/ai';
import { useAskAI, useGetAIConversation } from '../../queries';
import { Button } from '../ui/button';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  query?: string;
  response?: any;
  timestamp?: string;
};

const DEFAULT_QUESTION =
  'What documents do I need to travel from Kenya to Dubai?';

export default function FloatingChatWidget() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: askAI, isLoading: sending } = useAskAI();
  const { conversation = [], refetch } = useGetAIConversation();

  // Merge server conversation into local messages
  useEffect(() => {
    const merged = conversation.flatMap((c: any) => [
      {
        id: `user-${c.id}`,
        sender: 'user',
        query: c.query,
        timestamp: c.created_at,
      },
      {
        id: `ai-${c.id}`,
        sender: 'ai',
        response: c.response,
        timestamp: c.created_at,
      },
    ]);

    setMessages((prev) => {
      const existing = new Set(prev.map((m) => m.id));
      const filtered = merged.filter((m: any) => !existing.has(m.id));
      return [...prev, ...filtered];
    });
  }, [conversation]);

  // Polling for new server messages
  useEffect(() => {
    const interval = setInterval(refetch, 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  // Scroll to bottom function
  const scrollToBottom = (smooth = true) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;

      if (isNearBottom || smooth) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    }
  };

  // Scroll on mount
  useEffect(() => {
    scrollToBottom(false);
  }, []);

  // Scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Input auto-resize
  const handleInput = (e: any) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
    setQuestion(el.value);
  };

  // Handle sending message
  const handleSend = () => {
    if (!question.trim()) return;

    const userMsg: Message = {
      id: `local-${Date.now()}`,
      sender: 'user',
      query: question,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);

    askAI({ query: question }, { onSuccess: () => refetch() });

    setQuestion('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  // Render AI response nicely
  const renderAIResponse = (resp: any) => {
    if (!resp) return null;

    const sections = [
      { title: 'Visa Documentation', data: resp.visa_documentation },
      { title: 'Passport Requirements', data: resp.passport_requirements },
      { title: 'Additional Documents', data: resp.additional_documents },
      { title: 'Travel Advisories', data: resp.travel_advisories },
    ];

    return (
      <div className="space-y-3 text-sm">
        {sections.map(
          (section) =>
            section.data?.length > 0 && (
              <div
                key={section.title}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-1">
                  {section.title}
                </h4>
                <ul className="list-disc ml-4 space-y-1 text-gray-700 dark:text-gray-300">
                  {section.data.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    );
  };

  // Render each message bubble
  const renderMessage = (msg: Message) => {
    const isUser = msg.sender === 'user';

    return (
      <motion.div
        key={msg.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
      >
        <div
          className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-3 shadow ${
            isUser
              ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white dark:from-teal-700 dark:to-teal-800'
              : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
          }`}
        >
          <div className="flex items-start gap-2">
            {isUser ? (
              <AiOutlineUser className="mt-1" />
            ) : (
              <AiOutlineRobot className="mt-1 text-teal-500 dark:text-teal-400" />
            )}

            <div className="flex flex-col text-sm">
              {isUser ? msg.query : renderAIResponse(msg.response)}

              {msg.timestamp && (
                <span className="text-xs opacity-60 mt-1 self-end text-gray-500 dark:text-gray-400">
                  {format(new Date(msg.timestamp), 'HH:mm')}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 px-4 py-3 md:px-5 md:py-4 rounded-full bg-gradient-to-br from-teal-500 to-amber-500 dark:from-teal-700 dark:to-amber-800 text-white shadow-2xl flex items-center gap-2"
      >
        {open ? (
          <GridCloseIcon />
        ) : (
          <>
            Ask AI <AiOutlineRobot />
          </>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <Draggable handle=".drag-handle">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="
                fixed z-50
                bottom-20 right-2
                w-[95vw] sm:w-[420px] md:w-[460px] lg:w-[480px]
                max-h-[85vh]
                bg-white dark:bg-gray-900
                rounded-2xl
                shadow-2xl
                border border-gray-200 dark:border-gray-700
                flex flex-col
                overflow-hidden
              "
            >
              {/* Header */}
              <div className="drag-handle cursor-move flex justify-between items-center p-4 bg-gradient-to-r from-teal-500 to-amber-500 dark:from-teal-700 dark:to-amber-800 text-white">
                <h3 className="font-bold flex items-center gap-2">
                  <AiOutlineRobot /> Travel AI Assistant
                </h3>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50 dark:bg-gray-800"
              >
                {messages.length === 0 && (
                  <p className="text-gray-400 dark:text-gray-500 text-center mt-10">
                    Ask about travel documents ✈️
                  </p>
                )}

                {messages.map(renderMessage)}

                {sending && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                    AI is typing...
                  </p>
                )}
              </div>

              {/* Input */}
              <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  value={question}
                  onChange={handleInput}
                  placeholder="Ask about travel requirements..."
                  rows={2}
                  className="
                    flex-1
                    text-sm
                    resize-none
                    overflow-y-auto
                    rounded-xl
                    border border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    text-gray-900 dark:text-gray-100
                    p-2
                    focus:outline-none
                    focus:ring-2
                    focus:ring-teal-500
                  "
                  style={{ maxHeight: 140 }}
                />

                {question?.length > 0 && (
                  <Button
                    onClick={handleSend}
                    disabled={sending}
                    className="shrink-0"
                  >
                    Send
                  </Button>
                )}
              </div>
            </motion.div>
          </Draggable>
        )}
      </AnimatePresence>
    </>
  );
}
