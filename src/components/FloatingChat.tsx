'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

// ============================================================
// n8n Webhook URL（串接本地 PI Agent）
// ============================================================
// 在 n8n 建立 Workflow → Webhook 節點（POST）→ 傳給 PI Agent
// ============================================================

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://indexed-artwork-batman-usgs.trycloudflare.com/webhook/homietek-chat';

// ============================================================
// 語系文本定義 (i18n)
// ============================================================
const CHAT_DICTS: Record<string, any> = {
  'zh-TW': {
    title: 'AI 智能客服',
    button: 'AI 智能客服',
    greetingTitle: '你好！我是合米科技 AI 客服',
    greetingSub: '有任何問題都可以問我喔～',
    placeholder: '輸入問題...',
    error: '⚠️ 暫時無法連線到 AI 客服，請稍後再試。',
    defaultSender: '合米 AI 智能助理',
  },
  'en': {
    title: 'AI Assistant',
    button: 'AI Assistant',
    greetingTitle: "Hello! I'm HomieTek's AI Assistant",
    greetingSub: 'Feel free to ask me anything about our solutions!',
    placeholder: 'Type a message...',
    error: '⚠️ Unable to connect to AI Assistant. Please try again later.',
    defaultSender: 'HomieTek AI Assistant',
  },
  'ja': {
    title: 'AIアシスタント',
    button: 'AIアシスタント',
    greetingTitle: 'こんにちは！合米科技AIアシスタントです',
    greetingSub: 'スマートホームについて何でもご質問ください！',
    placeholder: 'メッセージを入力...',
    error: '⚠️ 一時的にAIサポートに接続できません。後ほどお試しください。',
    defaultSender: '合米科技AIアシスタント',
  },
};

// ============================================================
// AI 客服聊天視窗
// ============================================================

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sender?: string;
}

function AIChatWindow({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = CHAT_DICTS[lang] || CHAT_DICTS['zh-TW'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          event: 'ai_chat',
          message: userMsg,
          timestamp: new Date().toISOString(),
          lang: lang || 'zh-TW',
        }),
      });
      const data = await res.json();
      const reply = data.output || data.reply || data.message || data.text || JSON.stringify(data);
      const senderName = data.sender || t.defaultSender;
      setMessages(prev => [...prev, { role: 'assistant', content: reply, sender: senderName }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: t.error,
        sender: 'System Notice',
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col" style={{ height: '480px' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white text-lg">smart_toy</span>
            <span className="text-white font-bold">{t.title}</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
          {messages.length === 0 && (
            <div className="text-center text-slate-400 text-sm mt-8">
              <span className="material-symbols-outlined text-4xl mb-2 block text-primary">chat</span>
              <p className="font-bold text-slate-600 dark:text-slate-300">{t.greetingTitle}</p>
              <p className="mt-1 text-xs">{t.greetingSub}</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {/* 顯示回答者標籤 (AI 助理 / 真人客服) */}
              {msg.role === 'assistant' && msg.sender && (
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 ${
                    msg.sender.includes('專人') || msg.sender.includes('老闆') || msg.sender.includes('Human') || msg.sender.includes('Boss') || msg.sender.includes('真人') || msg.sender.includes('工程師')
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/80 dark:text-amber-100 border border-amber-300 dark:border-amber-700 animate-pulse'
                      : 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900/80 dark:text-indigo-100 border border-indigo-300 dark:border-indigo-700'
                  }`}>
                    <span>{msg.sender.includes('專人') || msg.sender.includes('老闆') || msg.sender.includes('Human') || msg.sender.includes('Boss') || msg.sender.includes('真人') || msg.sender.includes('工程師') ? '🧑‍💼' : '🤖'}</span>
                    <span>{msg.sender}</span>
                  </span>
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-xs font-medium'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-xs'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  🤖 {t.title} 思考中...
                </span>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-xs px-4 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder={t.placeholder}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors text-slate-800 dark:text-slate-100"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-primary text-white rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center shadow-md"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 主元件
// ============================================================

export default function FloatingChat() {
  const [showAIChat, setShowAIChat] = useState(false);
  const params = useParams();
  const lang = (params?.lang as string) || 'zh-TW';
  const t = CHAT_DICTS[lang] || CHAT_DICTS['zh-TW'];

  return (
    <>
      {/* AI 客服聊天視窗 */}
      <AIChatWindow isOpen={showAIChat} onClose={() => setShowAIChat(false)} lang={lang} />

      {/* 網站唯一的專屬 AI 智能客服浮動按鈕 */}
      <button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gradient-to-r from-primary via-indigo-600 to-secondary text-white rounded-full px-5 py-3.5 shadow-2xl hover:scale-105 hover:shadow-primary/50 transition-all duration-300 border border-white/20 group"
        aria-label={t.button}
      >
        <span className="material-symbols-outlined text-xl animate-bounce">smart_toy</span>
        <span className="font-bold text-sm tracking-wider">{t.button}</span>
      </button>
    </>
  );
}
