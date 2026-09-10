import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Star,
  Stethoscope,
  Syringe,
  Baby,
  Smile,
  Activity,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  HeartPulse
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    category: "Estetik Diş Hekimliği",
    items: [
      {
        title: "Zirkonyum Kaplama",
        desc: "Sert ve beyaz renkte metal elementidir. Dayanıklılıktan ödün vermeden doğal görünüm sağlar. Işığı geçirme özelliği sayesinde özellikle ön bölge dişlerde tercih edilir.",
        icon: Smile
      },
      {
        title: "Laminate Veneer (Yaprak Diş)",
        desc: "Dişlerin kesilmeden veya milimetrik inceltmelerle uygulandığı, son derece ince ve metal içermeyen estetik restorasyonlardır.",
        icon: Sparkles
      },
      {
        title: "Diş Beyazlatma (Bleaching)",
        desc: "Çay, kahve ve sigara nedeniyle sararan dişleri birkaç ton açarak doğal rengini geri kazandıran, dişlere zarar vermeyen estetik tedavidir.",
        icon: Sparkles
      },
      {
        title: "Pembe Estetik",
        desc: "Diş eti asimetrisi ve şekil bozukluklarını gidererek diş, dudak ve diş etini uyumlu hale getiren gülüş tasarımı uygulamasıdır.",
        icon: HeartPulse
      },
    ]
  },
  {
    category: "Restoratif ve Cerrahi Tedaviler",
    items: [
      {
        title: "İmplant Uygulamaları",
        desc: "Eksik dişlerin yerine çene kemiğine yerleştirilen titanyum yapay köklerdir. Komşu dişlere müdahale etmeden sabit protez imkanı sunar.",
        icon: Activity
      },
      {
        title: "Dolgu ve Kanal Tedavisi",
        desc: "Çürük veya kırık dişlerin fonksiyonunu geri kazandıran kompozit dolgular ve enfekte pulpa dokusunu temizleyen kanal tedavileri.",
        icon: ShieldCheck
      },
      {
        title: "Diş ve Çene Botoksu",
        desc: "Gummy Smile (Diş eti gülüşü) ve Bruksizm (Diş sıkma) problemlerine yönelik ameliyatsız, ağrısız estetik çözümler.",
        icon: Syringe
      },
    ]
  },
  {
    category: "Uzmanlık Alanlarımız",
    items: [
      {
        title: "Ortodontik Tedavi",
        desc: "Diş çapraşıklıkları ve iskeletsel bozuklukların metal braketler veya şeffaf plaklar (Invisalign, ClearCorrect) ile düzeltilmesi.",
        icon: Stethoscope
      },
      {
        title: "Çocuk Diş Hekimliği (Pedodonti)",
        desc: "Süt ve karma dişlenme dönemindeki çocuklarda koruyucu tedaviler, çürük tedavileri ve yer tutucu uygulamaları.",
        icon: Baby
      },
      {
        title: "Periodontal Tedavi",
        desc: "Dişeti iltihaplanmaları (Gingivitis ve Periodontitis) tedavisi, profesyonel diş temizliği ve kemik grefti uygulamaları.",
        icon: CheckCircle2
      },
    ]
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden bg-white pt-24 text-slate-800">

      {/* PROFESSIONAL MEDICAL HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-20 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            <MapPin size={16} />
            Natoyolu · Doğukent · Mamak
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl">
            Gülüşünüz için <br/>
            <span className="text-blue-600">en kaliteli ve güvenilir</span> <br/>
            tedaviler.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Sim Dent Ağız ve Diş Sağlığı Polikliniği olarak; uzman hekim kadromuz ve yenilikçi teknolojilerimizle, sağlıklı ve estetik bir gülüşe sahip olmanızı sağlıyoruz.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/randevu")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <CalendarDays size={20} /> Randevu Talebi Oluştur
            </button>

            <div className="flex items-center gap-2 px-4 py-2">
              <span className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }, (_, i) => <Star key={i} size={20} className="fill-current" />)}
              </span>
              <span className="font-bold text-slate-900">4.8</span>
              <span className="text-sm font-medium text-slate-500">(235 Yorum)</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 w-full"
        >
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/unnamed.jpg" alt="Klinik Ortamı" className="rounded-3xl object-cover h-64 w-full shadow-md" />
            <div className="grid gap-4">
              <img src="/images/unnamed (2).jpg" alt="Klinik Tedavi" className="rounded-3xl object-cover h-32 w-full shadow-md" />
              <div className="bg-slate-50 rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                <img src="/images/simdent-logo.png" alt="Sim Dent Logo" className="h-12 object-contain mb-2" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ağız ve Diş Sağlığı</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* COMPREHENSIVE SERVICES SECTION */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-blue-600">Tedavi Hizmetlerimiz</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">Uzmanlıkla Uyguladığımız Tedaviler</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Hastalarımızın ihtiyaçlarına özel, etik değerlere sadık kalarak ve en son teknolojileri kullanarak kapsamlı diş sağlığı hizmeti sunuyoruz.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((group) => (
              <div key={group.category}>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <span className="h-8 w-1 bg-blue-600 rounded-full"></span>
                  {group.category}
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map(({ title, desc, icon: Icon }) => (
                    <div key={title} className="group rounded-3xl border border-slate-200 bg-white p-8 transition hover:border-blue-600 hover:shadow-xl">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-110">
                        <Icon size={28} />
                      </span>
                      <h4 className="mt-6 text-xl font-bold text-slate-900">{title}</h4>
                      <p className="mt-3 leading-7 text-slate-600">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;