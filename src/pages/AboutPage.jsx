import { motion } from "framer-motion";
import { CheckCircle2, HeartHandshake, ShieldCheck, Stethoscope, Target, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  ["Özenli yaklaşım", "Her ziyaretinizi rahat ve anlaşılır bir deneyime dönüştürmeyi hedefliyoruz.", HeartHandshake],
  ["Açık iletişim", "Tedavi seçeneklerinizi ve sürecinizi anlaşılır biçimde paylaşırız.", Stethoscope],
  ["Güvenli bakım", "Steril, düzenli ve hasta konforunu önceleyen bir klinik ortamı sunarız.", ShieldCheck],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Header Section */}
      <section className="bg-blue-600 px-5 py-20 text-center text-white sm:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-100">Hakkımızda</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Gülüşünüze güvenle eşlik ediyoruz.</h1>
          <p className="mt-5 text-lg leading-8 text-blue-50/90">Sim Dent Ağız ve Diş Sağlığı Polikliniği, Mamak’ta modern klinik bakımı samimi iletişimle buluşturur.</p>
        </motion.div>
      </section>

      {/* Corporate Content Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-blue-600">Kurumsal</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Sim Dent Ağız ve Diş Polikliniği</h2>
            <p className="mt-5 leading-8 text-slate-600">
              Uzman hekim kadromuz ile hasta beklentilerini en üst seviyede karşılayabilmek adına hizmet kalitemizi ve vizyonumuzu sürekli geliştirirken ailemizin bireyleri olarak gördüğümüz hastalarımızı keyifle, mutlu ve sağlıklı şekilde doya doya gülmelerini sağlıyoruz.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Eye size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Vizyon</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Diş sağlığı alanında lider bir kuruluş olarak, hastalarımıza en kaliteli ve güvenilir tedavileri sunmayı amaçlıyoruz. Yenilikçi teknolojileri kullanarak, her bireyin gülüşünü sağlıklı ve estetik bir şekilde güzelleştirmeye odaklanıyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Misyon</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Misyonumuz, her hasta için kişiye özel ve kapsamlı diş sağlığı hizmeti sunarak, hastalarımızın sağlıklı bir gülümsemeye sahip olmalarını desteklemek. Etik değerlere sadık kalarak en son teknolojileri ve en iyi uygulama yöntemlerini kullanarak güven kazanmak.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/unnamed.jpg" alt="Sim Dent karşılama" className="h-64 w-full rounded-3xl object-cover shadow-lg" />
            <img src="/images/unnamed (3).jpg" alt="Sim Dent bekleme alanı" className="mt-10 h-52 w-full rounded-3xl object-cover shadow-lg" />
            <img src="/images/unnamed (1).jpg" alt="Sim Dent koridoru" className="col-span-2 h-44 w-full rounded-3xl object-cover shadow-lg" />
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-blue-600">Yaklaşımımız</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Sizi merkeze alan klinik değerler</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(([title, text, Icon]) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:border-blue-600">
                <Icon className="text-blue-600" size={28} />
                <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex items-center gap-3 rounded-2xl bg-blue-50 p-5 text-blue-900">
            <CheckCircle2 className="shrink-0 text-blue-600" />
            <p className="font-medium">Tedavi kararları, klinik muayene ve uzman değerlendirmesi sonrasında kişiye özel olarak planlanır.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
