'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fallbackLng } from '../i18n/settings';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${fallbackLng}`);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-base font-semibold tracking-wide">正在前往合米科技官方網站...</span>
      </div>
      <Link
        href={`/${fallbackLng}`}
        className="text-xs text-slate-400 hover:text-primary transition-colors underline underline-offset-4"
      >
        如未自動跳轉，請點此進入繁體中文首頁
      </Link>
    </div>
  );
}


