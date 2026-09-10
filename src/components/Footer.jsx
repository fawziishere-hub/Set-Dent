import {
  MapPin,
  Phone,
  Instagram,
  Clock,
  MessageCircle
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-slate-50 mt-20 relative border-t border-slate-200">

      {/* GLOBAL FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/905064417233"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform hover:scale-110 hover:bg-[#20b858]"
        aria-label="WhatsApp İletişim"
      >
        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* CTA Section */}
      {pathname !== "/about" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-slate-200 mx-4 md:mx-8 lg:mx-16 rounded-3xl -mb-10 z-10 relative shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-[45%] min-h-[280px] lg:min-h-[320px] flex items-center justify-center overflow-hidden">
              <img src="/images/unnamed (2).jpg" alt="Sim Dent Klinik" className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-slate-900/10"></div>
            </div>
            <div className="w-full lg:w-[55%] p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10 bg-white">
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-black text-slate-900 leading-tight mb-4">Gülüşünüz İçin Güvenilir Adres</h2>
              <p className="text-slate-600 mb-6 text-lg font-medium">Uzman hekim kadromuz ile ağız ve diş sağlığınız için en modern tedavi yöntemlerini sunuyoruz.</p>
              <Link to="/randevu" className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105 inline-block">Hemen Randevu Al</Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Footer */}
      <div className="bg-white px-4 md:px-8 lg:px-16 pt-32 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Brand Section */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={() => navigate("/")}>
                <img src="/images/simdent-logo.png" alt="Sim Dent Logo" className="h-14 w-auto object-contain" />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed my-3 font-medium">
                Sim Dent Ağız ve Diş Sağlığı Polikliniği, Mamak'ta modern klinik bakımı samimi iletişimle buluşturur.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-slate-900 mb-4 text-base">Hızlı Menü</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Ana Sayfa</Link></li>
                <li><Link to="/tedaviler" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Tedavilerimiz</Link></li>
                <li><Link to="/hakkimizda" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Hakkımızda</Link></li>
                <li><Link to="/randevu" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Randevu</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <h3 className="font-bold text-slate-900 mb-4 text-base">İletişim & Adres</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm leading-relaxed font-medium">
                    Cengizhan, Natoyolu Cd No:189/c<br/>06260 Mamak/Ankara
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex flex-col space-y-1">
                    <a href="tel:05064417233" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">+90 506 441 72 33</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                  <a href="https://wa.me/905064417233" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-green-500 transition-colors text-sm font-medium">WhatsApp ile Yazın</a>
                </li>
                <li className="flex items-center gap-3 mt-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-slate-600 text-sm font-medium">09:00 itibarıyla hizmetinizde</span>
                </li>
              </ul>
            </div>

            {/* Clickable Map */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Cengizhan,+Natoyolu+Caddesı+No:189/c,+06260+Mamak/Ankara"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-4 h-full min-h-[200px] rounded-xl overflow-hidden shadow-sm border border-slate-200 relative block group cursor-pointer"
            >
              <div className="absolute inset-0 z-10 bg-transparent group-hover:bg-white/40 transition-all flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100">
                <div className="bg-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-xl transition-all transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">
                  <MapPin size={20} />
                  Yol Tarifi Al
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0385906375084!2d32.9366!3d39.9197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d3510065a452bf%3A0xc68297b83d1c5a1!2sSim+Dent!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '200px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sim Dent Harita"
                className="pointer-events-none grayscale opacity-80"
              ></iframe>
            </a>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-50 px-4 md:px-8 lg:px-16 py-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Sim Dent Ağız ve Diş Sağlığı. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://simdentdisklinigi.com.tr" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;