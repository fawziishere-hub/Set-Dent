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
    <main className="min-h-screen bg-[#f6f9fc] pt-20">
      <section className="relative overflow-hidden bg-[#10394f] py-20 text-center text-white sm:py-24">
        <img src="/images/unnamed (3).jpg" alt="Sim Dent klinik iç mekanı" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#10394f]/80" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto max-w-3xl px-5">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-sky-200">Tedavilerimiz</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Gülüşünüze uygun bir yol haritası</h1>
          <p className="mt-5 text-lg leading-8 text-sky-50/90">Her tedavi, klinik değerlendirme sonrasında ihtiyaçlarınıza göre planlanır.</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="space-y-8">
          {treatments.map(({ code, title, english, description, details, image, Icon }, index) => (
            <motion.article
              key={code}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className={`grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2 ${index % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="min-h-64">
                <img src={image} alt={title} className="h-full w-full object-cover" />
              </div>
              <div className="p-7 sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e9f6fc] text-[#0a6fa8]"><Icon size={25} /></span>
                <p className="mt-6 text-sm font-bold uppercase tracking-[.14em] text-[#0a6fa8]">{english}</p>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900">{title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{description}</p>
                <ul className="mt-6 space-y-3 text-sm font-medium text-slate-600">
                  {details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a6fa8]" />{detail}</li>)}
                </ul>
                <button onClick={() => navigate("/randevu")} className="mt-7 inline-flex items-center gap-2 font-bold text-[#0a6fa8] hover:text-[#075b8b]">
                  Randevu talebi oluştur <ArrowRight size={18} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
