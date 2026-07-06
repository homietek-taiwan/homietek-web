'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function Header({ dict }: { dict: any }) {
  const params = useParams();
  const currentLang = params.lang as string;
  const router = useRouter();
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  const navLinks = [
    { href: `/${currentLang}/about`, label: dict.header.about },
    { href: `/${currentLang}/solutions`, label: dict.header.solutions },
    { href: `/${currentLang}/scenes`, label: dict.header.scenes },
    { href: `/${currentLang}/portfolio`, label: dict.header.portfolio },
    { href: `/${currentLang}/support`, label: dict.header.support },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href={`/${currentLang}`} className="flex items-center gap-3">
          <Image src={`${basePath}/logo.png`} alt="HomieTek Logo" width={40} height={40} className="h-10 w-auto object-contain" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            合米科技 <span className="text-primary">HomieTek</span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <select 
            value={currentLang} 
            onChange={handleLanguageChange}
            className="bg-transparent border border-slate-300 dark:border-slate-600 rounded-md py-1 px-2 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none focus:border-primary"
            aria-label="選擇語言 / Select Language"
          >
            <option value="zh-TW" className="text-slate-900">繁體中文</option>
            <option value="en" className="text-slate-900">English</option>
            <option value="ja" className="text-slate-900">日本語</option>
          </select>
          <Link 
            href={`/${currentLang}/booking`}
            className="hidden sm:inline-flex bg-primary text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95 whitespace-nowrap"
          >
            {dict.header.bookNow}
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="開啟選單"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link 
              href={`/${currentLang}/booking`}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-primary text-white py-3 rounded-xl font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors"
            >
              {dict.header.bookNow}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

