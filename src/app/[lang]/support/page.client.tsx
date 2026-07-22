'use client';

import { useState } from 'react';

// n8n Webhook URL — 部署前請填入實際 URL
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://appointment-quantitative-ground-sequence.trycloudflare.com/webhook/homietek-chat';


interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function SupportPageClient() {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      if (N8N_WEBHOOK_URL) {
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },

          body: JSON.stringify({
            event: 'support_form',
            name: form.name,
            phone: form.phone,
            email: form.email,
            message: form.message,
            timestamp: new Date().toISOString(),
          }),
        });
      }
      setStatus('sent');
      setForm({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-black">服務支援</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 線上報修表單 */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">線上報修表單</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
              提供 24 小時線上報修服務，專人將會在第一時間與您聯繫安排維護。
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">姓名</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    placeholder="請輸入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">聯絡電話</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    placeholder="09xx-xxx-xxx"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">電子郵件</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">問題描述</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
                  placeholder="請描述您遇到的問題..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-primary/20"
              >
                {status === 'sending' ? '傳送中...' : status === 'sent' ? '✓ 已送出' : status === 'error' ? '✕ 傳送失敗，請重試' : '送出報修'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            {/* 即時客服 */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-white/10">chat</span>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">即時客服</h2>
                <p className="text-white/80 mb-8 text-sm leading-relaxed">
                  點擊右下角浮動按鈕，與我們的客服人員即時聊天。
                </p>
                <div className="text-xs text-white/60 bg-white/10 rounded-lg p-3 mb-4">
                  <p>⚙️ 設定步驟：</p>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>至 tawk.to 註冊帳號</li>
                    <li>建立 Property 取得 Widget ID</li>
                    <li>填入 .env.local 中的 TAWK_* 變數</li>
                  </ol>
                </div>
                <p className="text-white/60 text-xs">
                  狀態：{process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ? '✅ 已啟用' : '⏳ 待設定帳密'}
                </p>
              </div>
            </div>

            {/* 下載專區 */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">下載專區</h2>
              <ul className="space-y-4">
                {[
                  { icon: 'description', label: 'APP 使用手冊' },
                  { icon: 'quiz', label: '常見問題 (FAQ)' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">{item.icon}</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 服務流程 */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">服務流程</h2>
              <div className="space-y-4">
                {['諮詢', '現場場勘', '規劃提案', '安裝調試', '售後保固'].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
