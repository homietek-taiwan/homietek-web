import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingChat from '@/components/FloatingChat';
import { getDictionary } from '@/i18n/getDictionary';
import { languages } from '@/i18n/settings';

const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '合米科技 HomieTek - 智慧生活領導者',
  description: '合米科技是您的智慧居家專家，我們致力於將最先進的物聯網技術帶入每個家庭。',
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${publicSans.className} bg-slate-50 dark:bg-slate-950 font-display text-slate-800 dark:text-slate-100 transition-colors duration-300 antialiased`}>
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          <Header dict={dict} />
          {children}
          <Footer dict={dict} lang={lang} />
          <FloatingChat />
        </div>
      </body>
    </html>
  );
}
