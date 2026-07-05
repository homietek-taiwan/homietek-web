import { getDictionary } from '@/i18n/getDictionary';
import Image from 'next/image';

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const solutions = dict.solutions;

  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      
      {/* Header */}
      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-black mb-6">{solutions.title}</h1>
        <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">{solutions.subtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Four Tech Fields */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{solutions.tech.title}</h2>
            <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.tech.items.map((item: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm overflow-hidden group hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Space Services */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{solutions.space.title}</h2>
            <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.space.items.map((item: any, idx: number) => (
              <div key={idx} className="relative group overflow-hidden rounded-3xl h-80 bg-slate-800 flex items-end p-8 shadow-md hover:shadow-2xl transition-all">
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/10 z-10 transition-opacity group-hover:opacity-90"></div>
                <div className="relative z-20 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold mb-3 drop-shadow-md">{item.title}</h3>
                  <p className="text-slate-200 text-sm opacity-90 leading-relaxed font-light drop-shadow-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
