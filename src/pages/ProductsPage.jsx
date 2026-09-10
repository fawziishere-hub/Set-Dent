import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const treatments = [
  {
    code: "zirconium_veneers",
    title: "Zirkonyum",
    english: "Zirconium Veneers",
    description: "Gülüş estetiğini doğal görünümle buluşturmayı hedefleyen kişiye özel zirkonyum uygulamaları.",
    details: ["Doğal renk ve ışık geçirgenliği", "Kişiye özel estetik planlama", "Dijital ölçü ve takip"],
    image: "/images/unnamed.jpg",
    Icon: Sparkles,
  },
  {
    code: "orthodontics",
    title: "Ortodonti",
    english: "Orthodontics",
    description: "Dişlerin ve çene yapısının uyumunu değerlendiren, uzun vadeli ağız sağlığını destekleyen tedavi planları.",
    details: ["Detaylı ağız ve çene değerlendirmesi", "Tedavi süresince düzenli takip", "Her yaş için danışmanlık"],
    image: "/images/unnamed (1).jpg",
    Icon: Stethoscope,
  },
  {
    code: "dental_implants",
    title: "İmplant Tedavisi",
    english: "Dental Implants",
    description: "Eksik dişler için fonksiyon, konfor ve estetiği birlikte ele alan kapsamlı implant tedavisi yaklaşımı.",
    details: ["Kişiye özel implant planlaması", "Fonksiyon ve estetik odaklı yaklaşım", "Tedavi sonrası kontrol"],
    image: "/images/unnamed (2).jpg",
    Icon: ShieldCheck,
  },
];

export default function ProductsPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f8fafc] pt-20">
      <section className="relative overflow-hidden bg-[#0f172a] py-24 text-center text-white sm:py-32">
        <div className="absolute inset-0 opacity-30">
          <img src="/images/unnamed (3).jpg" alt="Clinic Interior" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto max-w-4xl px-5">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-blue-400 mb-6">
            Tedavilerimiz
          </span>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl mb-6 leading-tight">
            Gülüşünüzü Yeniden <br />
            <span className="text-blue-400">Tasarla ve Keşfet</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
            Modern diş hekimliğinin tüm imkanlarını, kişiye özel yaklaşımlarla birleştiriyoruz.
            Sağlıklı ve estetik bir gülüşe giden yolda yanınızdayız.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 md:grid-cols-1">
          {treatments.map(({ code, title, english, description, details, image, Icon }, index) => (
            <motion.article
              key={code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group grid overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm md:grid-cols-2 ${index % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative min-h-80 overflow-hidden">
                <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-sm font-bold text-slate-900 shadow-lg">
                  <Icon size={16} className="text-blue-600" /> {title}
                </div>
              </div>
              <div className="p-8 sm:p-16 flex flex-col justify-center">
                <span className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3 block">
                  {english}
                </span>
                <h2 className="text-3xl font-black text-slate-900 sm:text-4xl mb-6">{title}</h2>
                <p className="text-lg leading-relaxed text-slate-600 mb-8">
                  {description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {details.map((detail) => (
                    <div key={detail} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 transition-all group-hover:bg-blue-50 group-hover:border-blue-100">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                      <span className="text-sm font-medium text-slate-700">{detail}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("/randevu")}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 w-fit"
                >
                  Randevu Talebi Oluştur <ArrowRight size={18} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
