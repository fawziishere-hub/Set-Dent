import { motion } from "framer-motion";
import {
  Stethoscope,
  Syringe,
  Baby,
  Smile,
  Activity,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  HeartPulse,
  ArrowRight
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

      {/* BILLBOARD HERO SECTION (Based on Reference Image) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2 sm:pt-6 mb-16">
        <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-[2rem] shadow-xl">
          
          {/* Background Image */}
          <img 
            src="/images/unnamed (1).jpg" 
            alt="Sim Dent Klinik" 
            className="absolute inset-0 h-full w-full object-cover object-center" 
          />
          
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

          {/* Bottom Content Container */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col md:flex-row items-start md:items-end justify-between p-6 sm:p-10 md:p-12 gap-6">
            
            {/* Left Side: Big Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 max-w-3xl"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Mamak'ta Profesyonel <br />
                Diş Tedavisi <span className="text-white/60 font-light">| Sim Dent</span>
              </h1>
            </motion.div>

            {/* Right Side: Subtext & Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-none flex flex-col items-start md:items-end text-left md:text-right"
            >
              <p className="text-slate-200 font-medium mb-5 max-w-xs text-sm sm:text-base leading-relaxed">
                Ankara Mamak Diş Kliniği: Ağrısız Tedavi & Uzman Kadro ile gülüşünüzü yeniden keşfedin.
              </p>
              <button
                onClick={() => navigate("/randevu")}
                className="group inline-flex items-center gap-2 rounded-full bg-[#a88157] px-7 py-3.5 font-bold text-white transition-all hover:bg-[#8b6945] hover:pr-6 shadow-lg shadow-amber-900/20"
              >
                Online Randevu Al
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE SERVICES SECTION */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a88157]">Tedavi Hizmetlerimiz</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">Uzmanlıkla Uyguladığımız Tedaviler</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Hastalarımızın ihtiyaçlarına özel, etik değerlere sadık kalarak ve en son teknolojileri kullanarak kapsamlı diş sağlığı hizmeti sunuyoruz.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((group) => (
              <div key={group.category}>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <span className="h-8 w-1.5 bg-[#a88157] rounded-full"></span>
                  {group.category}
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map(({ title, desc, icon: Icon }) => (
                    <div key={title} className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-[#a88157] hover:shadow-xl hover:-translate-y-1">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-[#a88157] transition group-hover:scale-110">
                        <Icon size={28} strokeWidth={1.5} />
                      </span>
                      <h4 className="mt-6 text-xl font-bold text-slate-900">{title}</h4>
                      <p className="mt-3 leading-relaxed text-slate-600 text-sm">{desc}</p>
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