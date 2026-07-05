import { getDictionary } from '@/i18n/getDictionary';
import Image from 'next/image';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const about = dict.about;

  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-black">{dict.header.about}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Brand Vision */}
        <section className="mb-24 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-slate-900 dark:text-white">
              {about.vision.title}
            </h2>
            <div className="w-24 h-1.5 bg-primary mb-8 rounded-full"></div>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              {about.vision.description}
            </p>
          </div>
          <div className="relative h-96 w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform duration-500">
            <Image src={about.vision.image} alt={about.vision.title} fill className="object-cover" unoptimized />
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            {about.coreValues.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.coreValues.items.map((item: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 text-center overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all group">
                <div className="w-full h-48 rounded-2xl bg-slate-100 overflow-hidden mb-6 relative">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Introduction */}
        <section className="bg-slate-900 text-white rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden mb-24">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-6xl text-primary mb-6">workspace_premium</span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">{about.team.title}</h2>
            <p className="text-xl text-slate-300 leading-relaxed font-light">
              {about.team.description}
            </p>
          </div>
        </section>

        {/* Service Flow */}
        <section className="mb-24 relative">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">
            {about.serviceFlow.title}
          </h2>
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-[140px] left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 z-0 rounded-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {about.serviceFlow.steps.map((step: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 shadow-xl mb-6 flex items-center justify-center text-primary group-hover:border-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
