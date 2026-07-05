import { getDictionary } from '@/i18n/getDictionary';
import SceneCard from '@/components/SceneCard';

export default async function ScenesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const scenes = dict.scenes;

  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-black mb-6">{scenes.title}</h1>
        <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">{scenes.description}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scenes.items.map((item: any, idx: number) => (
            <SceneCard key={idx} item={item} />
          ))}
        </div>

      </div>
    </main>
  );
}
