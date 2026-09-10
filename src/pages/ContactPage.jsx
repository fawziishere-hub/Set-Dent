import { useState } from "react";
import { Clock, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("contact_messages").insert([data]);
      if (error) throw error;
      toast.success("Mesajınız başarıyla gönderildi. En kısa sürede size döneceğiz.");
      reset();
    } catch (error) {
      toast.error("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      <section className="bg-blue-600 px-5 py-20 text-center text-white sm:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-100">İletişim</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Sim Dent’e ulaşın</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-50/90">Sorularınız ve randevu talepleriniz için bizimle iletişime geçebilirsiniz.</p>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:px-10">
        <aside className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl sm:p-10">
          <h2 className="text-2xl font-extrabold">İletişim Bilgileri</h2>
          <p className="mt-3 leading-7 text-blue-100">Sizi doğru şekilde yönlendirebilmek için bize ulaşın.</p>
          <div className="mt-9 space-y-7 text-sm">
            <a href="https://www.google.com/maps/search/?api=1&query=Cengizhan%2C+Natoyolu+Caddesi+No%3A189%2Fc%2C+06260+Mamak%2FAnkara" target="_blank" rel="noreferrer" className="flex gap-4 group">
              <MapPin className="shrink-0 text-blue-200 group-hover:text-white transition-colors" />
              <span className="leading-relaxed"><strong className="block text-blue-200">Adres</strong>Cengizhan, Natoyolu Caddesi No:189/c, 06260 Mamak/Ankara</span>
            </a>
            <a href="tel:+905064417233" className="flex gap-4 group">
              <Phone className="shrink-0 text-blue-200 group-hover:text-white transition-colors" />
              <span className="leading-relaxed"><strong className="block text-blue-200">Telefon</strong>+90 506 441 72 33</span>
            </a>
            <div className="flex gap-4 group">
              <Clock className="shrink-0 text-blue-200 group-hover:text-white transition-colors" />
              <span className="leading-relaxed"><strong className="block text-blue-200">Çalışma saatleri</strong>09:00 itibarıyla hizmetinizde</span>
            </div>
            <div className="flex gap-4 group">
              <Mail className="shrink-0 text-blue-200 group-hover:text-white transition-colors" />
              <span className="leading-relaxed"><strong className="block text-blue-200">Konum kodu</strong>WW29+PJ Mamak, Ankara</span>
            </div>
          </div>
        </aside>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="text-2xl font-extrabold text-slate-900">Bize mesaj gönderin</h2>
          <p className="mt-2 text-slate-500">Size en kısa sürede dönüş yapalım.</p>
          <form onSubmit={handleSubmit((data) => onSubmit(data))} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Ad Soyad" error={errors.name?.message}>
                <input {...register("name", { required: "Ad Soyad gerekli" })} placeholder="Adınız Soyadınız" className="input" />
              </FormField>
              <FormField label="E-posta" error={errors.email?.message}>
                <input type="email" {...register("email", { required: "E-posta gerekli" })} placeholder="ornek@email.com" className="input" />
              </FormField>
            </div>
            <FormField label="Telefon" error={errors.phone?.message}>
              <input {...register("phone", { required: "Telefon gerekli" })} placeholder="05XX XXX XX XX" className="input" />
            </FormField>
            <FormField label="Mesajınız" error={errors.message?.message}>
              <textarea rows={5} {...register("message", { required: "Mesaj alanı boş bırakılamaz" })} placeholder="Sorunuzu veya randevu talebinizi yazın..." className="input resize-none" />
            </FormField>
            <button disabled={isLoading} className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700 disabled:opacity-70 shadow-lg shadow-blue-600/20">
              {isLoading ? "Gönderiliyor..." : "Mesajı Gönder"}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}

function FormField({ label, error, children }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {children}
      {error && <span className="block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
