'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type AIType = 'quiz' | 'privacy' | 'support';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface AIConfig {
  title: string;
  subtitle: string;
  placeholder: string;
  icon: string;
}

const configs: Record<AIType, AIConfig> = {
  quiz: {
    title: '🔍 AI選品クイズ',
    subtitle: 'あなたに最適な商品を見つけます',
    placeholder: '商品の特徴を入力してください...',
    icon: '🔍',
  },
  privacy: {
    title: '🔒 AIプライバシー顧問',
    subtitle: '配送・包装・支払いについてお気軽にどうぞ',
    placeholder: 'プライバシーに関するご質問をどうぞ...',
    icon: '🔒',
  },
  support: {
    title: '💬 AI客服',
    subtitle: 'ご購入に関するご質問をお受けします',
    placeholder: 'ご質問を入力してください...',
    icon: '💬',
  },
};

const welcomeMessages: Record<AIType, string> = {
  quiz: 'こんにちは！AI選品クイズへようこそ🎯\nどんな商品をお探しですか？例：「彼氏へのギフト」「新感覚の強さ」などで OK です',
  privacy:
    'こんにちは！AIプライバシー顧問です🔒\n配送、包装、支払い明細など、プライバシーに関するご質問をお気軽にどうぞ',
  support:
    'こんにちは！AI客服です💬\n商品について、配送についてなど、ご購入に関するご質問をお気軽にどうぞ',
};

type Position = 'bottom-right' | 'bottom-left' | 'bottom-right-2';

interface AIChatWidgetProps {
  type: AIType;
  position?: Position;
}

export default function AIChatWidget({
  type,
  position = 'bottom-right',
}: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const config = configs[type];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          message: userMessage.content,
          history: messages.slice(-20),
        }),
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'bot', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content:
            '申し訳ありません。一時的なエラーが発生しました。しばらく経ってから再度お試しください。',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, messages, type]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setUnread(false);
  };

  return (
    <div
      className={`ai-widget-root ai-bottom-${position}`}
      data-type={type}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleOpen}
        className="ai-toggle-btn"
        aria-label={config.title}
      >
        {unread && <span className="ai-unread-dot">●</span>}
        <span style={{ fontSize: '24px' }}>{config.icon}</span>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="ai-panel">
          {/* Header */}
          <div className="ai-panel-header">
            <div>
              <div className="ai-panel-title">{config.title}</div>
              <div className="ai-panel-subtitle">{config.subtitle}</div>
            </div>
            <button onClick={() => setIsOpen(false)} className="ai-close-btn">
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="ai-messages">
            <div className="ai-message ai-bot">
              <div className="ai-avatar">AI</div>
              <div className="ai-bubble">
                <p style={{ whiteSpace: 'pre-wrap' }}>
                  {welcomeMessages[type]}
                </p>
              </div>
            </div>

            {messages.map((msg, i) => (
              <div key={i} className={`ai-message ai-${msg.role}`}>
                {msg.role === 'bot' && <div className="ai-avatar">AI</div>}
                <div className="ai-bubble">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message ai-bot">
                <div className="ai-avatar">AI</div>
                <div className="ai-bubble">
                  <p>•••</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="ai-input-area" style={{ zIndex: 10, position: 'relative' }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={config.placeholder}
              rows={3}
              className="ai-textarea"
              style={{ zIndex: 11, position: 'relative', minHeight: '60px' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="ai-send-btn"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M2 21l21-9L2 3v7l15 2-15 2v7z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .ai-widget-root {
          position: fixed;
          bottom: 20px;
          z-index: 99999;
          font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont,
            sans-serif;
        }
        .ai-bottom-right {
          right: 20px;
        }
        .ai-bottom-right-2 {
          right: 90px;
        }
        .ai-bottom-left {
          left: 20px;
        }
        .ai-toggle-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #e94560;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          transition: all 0.3s;
          position: relative;
        }
        .ai-toggle-btn:hover {
          background: #c73e54;
          transform: scale(1.05);
        }
        .ai-unread-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          background: #ff4444;
          color: white;
          border-radius: 50%;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ai-panel {
          position: absolute;
          bottom: 70px;
          right: 0;
          width: 360px;
          max-width: calc(100vw - 40px);
          height: 500px;
          max-height: calc(100vh - 120px);
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .ai-panel-header {
          background: linear-gradient(135deg, #e94560, #c73e54);
          color: white;
          padding: 16px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .ai-panel-title {
          font-size: 16px;
          font-weight: 700;
        }
        .ai-panel-subtitle {
          font-size: 12px;
          opacity: 0.9;
          margin-top: 4px;
        }
        .ai-close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          opacity: 0.8;
          line-height: 1;
        }
        .ai-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f8f9fa;
          position: relative;
          z-index: 1;
        }
        .ai-message {
          display: flex;
          gap: 10px;
          max-width: 85%;
        }
        .ai-user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .ai-bot {
          align-self: flex-start;
        }
        .ai-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e94560;
          color: white;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ai-user .ai-avatar {
          background: #666;
        }
        .ai-bubble {
          background: white;
          padding: 12px 16px;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .ai-bubble p {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: #333;
        }
        .ai-user .ai-bubble {
          background: #e94560;
        }
        .ai-user .ai-bubble p {
          color: white;
        }
        .ai-input-area {
          padding: 12px 16px;
          background: white;
          border-top: 1px solid #e0e0e0;
          display: flex;
          gap: 10px;
          align-items: flex-end;
          position: relative;
          z-index: 10;
        }
        .ai-textarea {
          flex: 1;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 14px;
          font-family: inherit;
          resize: none;
          max-height: 120px;
          min-height: 60px;
          line-height: 1.5;
          outline: none;
          position: relative;
          z-index: 11;
        }
        .ai-textarea:focus {
          border-color: #e94560;
        }
        .ai-send-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #e94560;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .ai-send-btn:hover:not(:disabled) {
          background: #c73e54;
          transform: scale(1.05);
        }
        .ai-send-btn:disabled {
          background: #e0e0e0;
          cursor: not-allowed;
        }
        @media (max-width: 480px) {
          .ai-panel {
            width: calc(100vw - 30px);
            right: -10px;
            height: 60vh;
          }
        }
      `}</style>
    </div>
  );
}
