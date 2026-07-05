import { getDictionary } from '@/i18n/getDictionary';
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);
  const home = dict.home;
  const scenes = dict.scenes;

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-slate-950 flex items-center">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent z-10"></div>
          <Image 
            src={home.hero.bgImage}
            alt="Hero Background" 
            fill
            className="object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite]"
            unoptimized
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              {home.hero.tag}
            </span>
            <h1 
              className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 drop-shadow-lg"
              dangerouslySetInnerHTML={{ __html: home.hero.title }}
            />
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-light">
              {home.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${lang}/booking`} className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-primary/30">
                {home.hero.primaryBtn} <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href={`/${lang}/portfolio`} className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
                {home.hero.secondaryBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold dark:text-white">
              {home.promo.title}
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mt-6 mb-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.promo.items.map((item: any, idx: number) => (
              <div key={idx} className="rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:-translate-y-2 transition-all duration-300 flex flex-col items-start gap-4 shadow-sm hover:shadow-xl hover:shadow-primary/5 group">
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full group-hover:bg-primary group-hover:text-white transition-colors">{item.tag}</span>
                <h3 className="text-xl font-bold dark:text-white mt-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">{item.desc}</p>
                <Link href="#" className="font-bold text-primary flex items-center gap-1 mt-4 hover:gap-2 transition-all">
                  {item.action} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Home (Scenarios Preview) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent rounded-l-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{dict.header.scenes}</span>
              <h2 className="text-3xl lg:text-5xl font-black dark:text-white">
                {scenes.title}
              </h2>
            </div>
            <Link href={`/${lang}/scenes`} className="text-primary font-bold hover:text-primary/80 flex items-center gap-2 transition-colors group">
              看更多場景 <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scenes.items.slice(0, 3).map((item: any, idx: number) => (
              <Link href={`/${lang}/scenes`} key={idx} className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500 block">
                <Image src={item.image || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"} alt={item.title} fill className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                      <span className="material-symbols-outlined text-sm">{item.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-wide">{item.title}</h3>
                  </div>
                  <p className="text-slate-200 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 font-light leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold dark:text-white">
              {home.valueProps.title}
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mt-6 mb-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.valueProps.items.map((item: any, idx: number) => (
              <div key={idx} className="p-10 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 transform group-hover:rotate-6">
                  <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Preview */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="material-symbols-outlined text-4xl text-primary mb-4 block">photo_camera</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{home.instagram.title}</h2>
          <a href="#" className="inline-block px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-bold backdrop-blur-md">
            @HomieTek
          </a>
        </div>
        
        {/* Simple mock IG grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto pb-12">
           {[
             "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
             "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=400&q=80",
             "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
             "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80"
           ].map((img, idx) => (
             <a href="#" key={idx} className="group relative aspect-square overflow-hidden rounded-2xl block">
               <Image src={img} alt={`Instagram visual ${idx}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
               <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                 <span className="material-symbols-outlined text-white text-3xl">favorite</span>
               </div>
             </a>
           ))}
        </div>
      </section>
    </main>
  );
}
