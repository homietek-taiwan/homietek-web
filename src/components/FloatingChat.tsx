'use client';

import { useEffect } from 'react';

// ============================================================
// Tawk.to 客服系統
// ============================================================
// 1. 到 https://admin.tawk.to 註冊帳號
// 2. 新增 Property（網站）
// 3. 取得 Property 的 Widget ID（格式如: xxxxxxxxxx-yyyyyyyyyyy）
// 4. 將下方的 TAWK_PROPERTY_ID 和 TAWK_WIDGET_ID 替換為你的值
//    - 如果兩個都是空字串，Tawk.to 不會載入
// ============================================================

const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || '';
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || '';

// ============================================================
// n8n Webhook URL（串接本地 PI Agent）
// ============================================================
// 1. 在 n8n 建立 Workflow，觸發節點設為 Webhook
// 2. Webhook 設為 POST，Active 開啟
// 3. 將產生的 Webhook URL 填入下方
// 4. 例: http://localhost:5678/webhook/homietek-chat
// ============================================================

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';

export default function FloatingChat() {
  useEffect(() => {
    // --- Tawk.to 載入 ---
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

    // --- n8n Webhook: 當聊天視窗開啟時觸發 ---
    // 你可以監聽 Tawk.to 的事件，在客服開始對話時同時通知 n8n
    if (TAWK_PROPERTY_ID && TAWK_WIDGET_ID && N8N_WEBHOOK_URL) {
      window.addEventListener('tawkWidgetOpened', () => {
        fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'chat_started',
            timestamp: new Date().toISOString(),
            source: 'tawk_to_widget',
          }),
        }).catch(() => {
          // n8n 可能在本機，靜默失敗不影響客服功能
        });
      });
    }
  }, []);

  // 渲染一個可觸發的浮動按鈕（當 Tawk.to 未設定時顯示）
  if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID) {
    return (
      <a
        href="#support"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-secondary text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform"
        aria-label="客服"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </a>
    );
  }

  return null; // Tawk.to 會自動注入自己的 widget
}
