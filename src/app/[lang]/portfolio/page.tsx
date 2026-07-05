import { getDictionary } from '@/i18n/getDictionary';
import Image from 'next/image';
import Link from 'next/link';

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const portfolio = dict.portfolio;

  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-black">{portfolio.title}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Filters (UI representation) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {portfolio.filters.map((filter: string, idx: number) => (
            <button key={idx} className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${idx === 0 ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.cases.map((project: any) => (
            <Link href={`#`} key={project.id} className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200">
                    {project.category}
                  </span>
                  <span className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white">
                    {project.need}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex gap-4 mb-6 text-xs text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800 pb-4">
                  <span>{project.info.space}</span>
                  <span>|</span>
                  <span>{project.info.layout}</span>
                  <span>|</span>
                  <span>{project.info.style}</span>
                </div>
                <div className="mb-6 space-y-4 flex-1">
                  <div>
                    <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1"> Requirement </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{project.requirement}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-primary font-bold uppercase tracking-widest mb-1"> Solution </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{project.solution}</p>
                  </div>
                </div>
                
                <blockquote className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-sm text-slate-600 dark:text-slate-400 italic border-l-4 border-primary">
                  {project.quote}
                </blockquote>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
