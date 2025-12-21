/**
 * StickyChatbotButton Component
 * Floating chat interface for Docusaurus
 * 
 * Features:
 * - Sticky floating button in bottom-right corner
 * - Chat modal with auto-scrolling messages
 * - Typing indicators and loading states
 * - Mobile responsive
 * - Accessible keyboard navigation
 */

import React, { useState, useRef, useEffect } from 'react';
import { runWorkflow, type WorkflowInput, type WorkflowOutput } from '../services/chatbotAgent';
import styles from './StickyCharbot.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

const StickyCharbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Welcome to the Physical AI & Humanoid Robotics Textbook! I'm your AI guide. Ask me anything about this textbook, ROS 2, simulation, Isaac Sim, VLA, or robotics. I'll search our book first, then the web if needed!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addMessage = (text: string, sender: 'user' | 'bot'): string => {
    const id = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        id,
        text,
        sender,
        timestamp: new Date(),
      },
    ]);
    return id;
  };

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message
    addMessage(trimmedInput, 'user');
    setInput('');

    // Add loading indicator
    const loadingId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        id: loadingId,
        text: 'thinking...',
        sender: 'bot',
        timestamp: new Date(),
        isLoading: true,
      },
    ]);

    setIsLoading(true);

    try {
      // Call the chatbot agent
      const workflow: WorkflowInput = {
        input_as_text: trimmedInput,
      };

      const result: WorkflowOutput = await runWorkflow(workflow);

      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingId));

      // Add bot response
      addMessage(result.response || 'No response received', 'bot');

      // Add sources if available
      if (result.sources && result.sources.length > 0) {
        const sourceText = `📌 Sources: ${result.sources.join(', ')}`;
        addMessage(sourceText, 'bot');
      }
    } catch (error) {
      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingId));

      // Add error message
      const errorMessage =
        error instanceof Error
          ? `❌ Error: ${error.message}`
          : '❌ An unexpected error occurred. Please try again.';
      addMessage(errorMessage, 'bot');

      console.error('Chatbot error:', error);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`${styles.floatingBtn} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Open Chatbot"
        aria-label="Open AI Chatbot"
      >
        💬
      </button>

      {/* Chat Container */}
      {isOpen && (
        <div className={styles.chatContainer} role="dialog" aria-labelledby="chatbot-title">
          {/* Header */}
          <div className={styles.header}>
            <h2 id="chatbot-title" className={styles.title}>
              📚 Book Search Guide
            </h2>
            <p className={styles.subtitle}>
              Ask anything about our Physical AI textbook
            </p>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${styles[msg.sender]}`}
                role={msg.sender === 'user' ? 'article' : 'status'}
              >
                <div className={styles.messageContent}>
                  {msg.isLoading ? (
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your question... (Shift+Enter for new line)"
              className={styles.inputField}
              rows={1}
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button
              onClick={handleSendMessage}
              className={styles.sendBtn}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              {isLoading ? '⏳' : '→'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyCharbot;
