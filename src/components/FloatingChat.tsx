'use client';

import { useState, useEffect, useRef } from 'react';

// Tawk.to 全域型別宣告
declare global {
  interface Window {
    Tawk_API?: { maximize: () => void };
  }
}

// ============================================================
// Tawk.to 客服系統
// ============================================================
// 到 https://admin.tawk.to 註冊 → 建立 Property → 取得 Widget ID
// 填入 .env.local 中的 NEXT_PUBLIC_TAWK_PROPERTY_ID 和 NEXT_PUBLIC_TAWK_WIDGET_ID
// ============================================================

const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || '6a4a7f31ddba321d4575c90d';
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || '1jspg1m89';

// ============================================================
// n8n Webhook URL（串接本地 PI Agent）
// ============================================================
// 在 n8n 建立 Workflow → Webhook 節點（POST）→ 傳給 PI Agent
// ============================================================

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://indexed-artwork-batman-usgs.trycloudflare.com/webhook/homietek-chat';


// ============================================================
// AI 客服聊天視窗
// ============================================================

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function AIChatWindow({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
          lang: document.documentElement.lang || 'zh-TW',
        }),
      });
      const data = await res.json();
      // n8n 回傳格式: { output: "回复内容" } 或直接回文字
      const reply = data.output || data.reply || data.message || data.text || JSON.stringify(data);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ 暫時無法連線到 AI 客服，請稍後再試。',
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
        <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white text-lg">smart_toy</span>
            <span className="text-white font-bold">AI 智能客服</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950">
          {messages.length === 0 && (
            <div className="text-center text-slate-400 text-sm mt-8">
              <span className="material-symbols-outlined text-4xl mb-2 block">chat</span>
              <p>你好！我是合米科技 AI 客服</p>
              <p className="mt-1">有任何問題都可以問我喔～</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-4 py-2.5">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
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
              placeholder="輸入問題..."
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-primary text-white rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
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

  // Tawk.to 載入
  useEffect(() => {
    if (TAWK_PROPERTY_ID && TAWK_WIDGET_ID) {
      var Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement('script');
        var s0 = document.getElementsByTagName('script')[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/' + TAWK_PROPERTY_ID + '/' + TAWK_WIDGET_ID;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode?.insertBefore(s1, s0);
      })();
    }
  }, []);

  const tawkReady = !!(TAWK_PROPERTY_ID && TAWK_WIDGET_ID);
  const n8nReady = !!N8N_WEBHOOK_URL;

  return (
    <>
      {/* AI 客服聊天視窗 */}
      <AIChatWindow isOpen={showAIChat} onClose={() => setShowAIChat(false)} />

      {/* 浮動按鈕：當 Tawk.to 啟用時，改由 Tawk.to 原生右下角氣泡展示，刪除原本會重疊的自訂按鈕 */}
      {!tawkReady && n8nReady && (
        <button
          onClick={() => setShowAIChat(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-secondary text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform"
          aria-label="AI 客服"
        >
          <span className="material-symbols-outlined text-lg">smart_toy</span>
        </button>
      )}

      {!tawkReady && !n8nReady && (
        <a
          href="#support"
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-secondary text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined text-lg">chat</span>
        </a>
      )}
    </>
  );
}

