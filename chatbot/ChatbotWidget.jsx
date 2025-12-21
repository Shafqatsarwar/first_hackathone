/**
 * ChatbotWidget.jsx - React Component for GitHub Repository Chatbot
 * 
 * A sticky floating chatbot button with modal chat interface for asking
 * questions about the GitHub repository: https://github.com/Shafqatsarwar/first_hackathone.git
 * 
 * Usage:
 *   import ChatbotWidget from './ChatbotWidget';
 *   
 *   export default function App() {
 *     return (
 *       <div>
 *         <ChatbotWidget />
 *       </div>
 *     );
 *   }
 */

import React, { useState, useRef, useEffect } from 'react';

const ChatbotWidget = ({ apiUrl = 'http://localhost:8000/api/chat' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm your AI guide. Ask me anything about this GitHub repository (https://github.com/Shafqatsarwar/first_hackathone.git) or related topics. I'll search the repository first, then the web if needed!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text, sender) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        sender,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    addMessage(userMessage, 'user');
    setInput('');
    setIsLoading(true);

    try {
      // Try agent endpoint first
      let response = await fetch(`${apiUrl}/agent-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      // Fallback to regular endpoint if agent not available
      if (!response.ok && response.status === 500) {
        response = await fetch(`${apiUrl}/query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.response || data.output_text || 'No response received';

      addMessage(responseText, 'bot');

      // Show sources if available
      if (data.sources && data.sources.length > 0) {
        const sourceText = `📌 Sources: ${data.sources
          .map((s) => s.source || s)
          .join(', ')}`;
        addMessage(sourceText, 'bot');
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage(
        `❌ Error: ${error.message}. Please make sure the API server is running.`,
        'bot'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const styles = {
    container: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    },
    floatingBtn: {
      position: 'fixed',
      bottom: '12px',
      right: '12px',
      width: '44px',
      height: '44px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      zIndex: 999,
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
      },
    },
    chatContainer: {
      position: 'fixed',
      bottom: '64px',
      right: '12px',
      width: '280px',
      height: '400px',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 1000,
      animation: 'slideUp 0.3s ease',
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '8px 10px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },
    headerTitle: {
      fontSize: '13px',
      margin: 0,
      marginBottom: '2px',
      fontWeight: 600,
    },
    headerSubtitle: {
      fontSize: '9px',
      margin: 0,
      opacity: 0.9,
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    message: {
      display: 'flex',
      marginBottom: '3px',
      animation: 'fadeIn 0.3s ease',
    },
    userMessage: {
      justifyContent: 'flex-end',
    },
    botMessage: {
      justifyContent: 'flex-start',
    },
    messageContent: {
      maxWidth: '82%',
      padding: '6px 9px',
      borderRadius: '7px',
      wordWrap: 'break-word',
      fontSize: '11px',
      lineHeight: 1.4,
    },
    userMessageContent: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderBottomRightRadius: '2px',
    },
    botMessageContent: {
      background: '#f0f0f0',
      color: '#333',
      borderBottomLeftRadius: '2px',
    },
    inputArea: {
      borderTop: '1px solid #e0e0e0',
      padding: '6px',
      display: 'flex',
      gap: '5px',
    },
    inputField: {
      flex: 1,
      padding: '6px 8px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '11px',
      fontFamily: 'inherit',
      resize: 'none',
      maxHeight: '45px',
    },
    sendBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '6px 10px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '11px',
      transition: 'all 0.2s ease',
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .typing-indicator {
          display: flex;
          gap: 3px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #999;
          animation: bounce 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @media (max-width: 600px) {
          .chatbot-container {
            width: 90vw !important;
            height: 80vh !important;
            bottom: 80px !important;
            right: auto !important;
            left: 5vw !important;
          }
        }
      `}</style>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...styles.floatingBtn,
          background: isOpen
            ? 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        title="Open Chatbot"
      >
        💬
      </button>

      {/* Chat Container */}
      <div style={styles.chatContainer} className="chatbot-container">
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>💻 GitHub Repository Guide</h2>
          <p style={styles.headerSubtitle}>
            Ask anything about this repository
          </p>
        </div>

        {/* Messages */}
        <div style={styles.messagesContainer}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.message,
                ...(msg.sender === 'user'
                  ? styles.userMessage
                  : styles.botMessage),
              }}
            >
              <div
                style={{
                  ...styles.messageContent,
                  ...(msg.sender === 'user'
                    ? styles.userMessageContent
                    : styles.botMessageContent),
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ ...styles.message, ...styles.botMessage }}>
              <div style={{ ...styles.messageContent, ...styles.botMessageContent }}>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={styles.inputArea}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your question..."
            style={styles.inputField}
            rows="1"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            style={styles.sendBtn}
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
