'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function Header({ dict }: { dict: any }) {
  const params = useParams();
  const currentLang = params.lang as string;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href={`/${currentLang}`} className="flex items-center gap-3">
          <Image src="/logo.png" alt="HomieTek Logo" width={40} height={40} className="h-10 w-auto object-contain" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            合米科技 <span className="text-primary">HomieTek</span>
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href={`/${currentLang}/about`} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            {dict.header.about}
          </Link>
          <Link href={`/${currentLang}/solutions`} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            {dict.header.solutions}
          </Link>
          <Link href={`/${currentLang}/scenes`} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            {dict.header.scenes}
          </Link>
          <Link href={`/${currentLang}/portfolio`} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            {dict.header.portfolio}
          </Link>
          <Link href={`/${currentLang}/support`} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            {dict.header.support}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <select 
            value={currentLang} 
            onChange={handleLanguageChange}
            className="bg-transparent border border-slate-300 dark:border-slate-600 rounded-md py-1 px-2 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none focus:border-primary"
          >
            <option value="zh-TW">繁體中文</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
          <Link 
            href={`/${currentLang}/booking`}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
          >
            {dict.header.bookNow}
          </Link>
        </div>
      </div>
    </header>
  );
}
