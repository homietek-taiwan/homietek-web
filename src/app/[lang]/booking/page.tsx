import { getDictionary } from '@/i18n/getDictionary';
import Image from 'next/image';

export default async function BookingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const contact = dict.contact;
  
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-black">{contact.title}</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{contact.form.name}</label>
                 <input type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-medium transition-all" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{contact.form.phone}</label>
                 <input type="tel" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-medium transition-all" />
               </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{contact.form.email}</label>
              <input type="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-medium transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{contact.form.area}</label>
                 <select className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-medium transition-all appearance-none cursor-pointer">
                   {contact.form.areaOptions.map((opt: string, idx: number) => (
                     <option key={idx} value={idx === 0 ? '' : opt}>{opt}</option>
                   ))}
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{contact.form.time}</label>
                 <select className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-medium transition-all appearance-none cursor-pointer">
                   {contact.form.timeOptions.map((opt: string, idx: number) => (
                     <option key={idx} value={idx === 0 ? '' : opt}>{opt}</option>
                   ))}
                 </select>
               </div>
            </div>
            
            <button type="button" className="w-full bg-primary text-white font-black py-5 rounded-xl hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 transition-all text-lg mt-4">
              {contact.form.submit}
            </button>
          </form>

          <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
             <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 text-center border border-primary/20 mb-12">
               <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{contact.social.title}</h3>
               <p className="text-slate-600 dark:text-slate-400 mb-8">{contact.social.lineDesc}</p>
               <div className="inline-block p-4 bg-white rounded-2xl shadow-xl shadow-primary/10">
                 <Image src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://line.me/R/ti/p/@homietek" alt="LINE QR Code" width={200} height={200} className="rounded-lg" />
                 <p className="font-bold text-center mt-3 text-[#00B900]">@HomieTek</p>
               </div>
             </div>

             <div className="text-center">
               <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{contact.social.otherTitle}</h4>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                 <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                   <div className="p-2 bg-white rounded-xl mb-4 shadow-sm">
                     <Image src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://instagram.com" alt="IG QR Code" width={100} height={100} />
                   </div>
                   <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{contact.social.ig}</span>
                 </div>
                 <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                   <div className="p-2 bg-white rounded-xl mb-4 shadow-sm">
                     <Image src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://facebook.com" alt="FB QR Code" width={100} height={100} />
                   </div>
                   <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{contact.social.fb}</span>
                 </div>
                 <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 col-span-2 md:col-span-1">
                   <div className="p-2 bg-white rounded-xl mb-4 shadow-sm">
                     <Image src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=mailto:contact@homietek.com" alt="Email QR Code" width={100} height={100} />
                   </div>
                   <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{contact.social.email}</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
