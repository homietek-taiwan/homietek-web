import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ dict, lang }: { dict: any, lang: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <footer className="bg-slate-900 py-16 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <Link href={`/${lang}`} className="block mb-6">
              <Image src={`${basePath}/logo.png`} alt="HomieTek Logo" width={32} height={32} className="h-8 w-auto filter brightness-0 invert opacity-90" />
            </Link>

            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              {dict.footer.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">mail</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">call</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">{dict.footer.solutionsTitle}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              {dict.footer.solutionsList.map((item: string, idx: number) => (
                <li key={idx}>
                  <Link href={`/${lang}/solutions`} className="hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">{dict.footer.contactTitle}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">location_on</span> {dict.footer.address}</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">phone</span> {dict.footer.phone}</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">schedule</span> {dict.footer.hours}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
          <p>{dict.footer.copyright}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">{dict.footer.privacy}</a>
            <a href="#" className="hover:text-primary transition-colors">{dict.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
