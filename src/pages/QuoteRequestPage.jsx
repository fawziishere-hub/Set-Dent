import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  UserPlus,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Stethoscope,
  Baby,
  Smile,
  Activity,
  ShieldCheck
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

// Step Constants
const STEPS = {
  WELCOME: "welcome",
  USER_TYPE: "user_type",
  SERVICE: "service",
  DOCTOR_TIME: "doctor_time",
  USER_INFO: "user_info",
  VERIFICATION: "verification",
  CONFIRMATION: "confirmation",
};

const SERVICES = [
  { id: "muayene", name: "Muayene", duration: 30, icon: Stethoscope },
  { id: "pedodonti", name: "Pedodonti (Çocuk Diş)", duration: 30, icon: Baby },
  { id: "ortodonti", name: "Ortodonti", duration: 30, icon: Smile },
  { id: "cerrahi", name: "Ağız ve Çene Cerrahisi", duration: 30, icon: Activity },
  { id: "periodontoloji", name: "Diş Eti (Periodontoloji)", duration: 30, icon: ShieldCheck },
];

const getTodayLocalISO = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const createTimeSlots = () => Array.from({ length: 18 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

export default function QuoteRequestPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.WELCOME);
  const [loading, setLoading] = useState(false);
  const [bookedTimes, setBookedTimes] = useState([]);

  const [formData, setFormData] = useState({
    userType: "", // 'new' | 'registered'
    serviceId: "",
    doctorId: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "", // Added notes state
    verificationCode: "",
  });

  // Welcome screen transition
  useEffect(() => {
    const timer = setTimeout(() => setStep(STEPS.USER_TYPE), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!formData.date) return;
    const fetchSlots = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .rpc("get_booked_times", { check_date: formData.date });
      if (!error && data) {
        setBookedTimes(data.map(row => row.reservation_time?.slice(0, 5)).filter(Boolean));
      }
      setLoading(false);
    };
    fetchSlots();
  }, [formData.date]);

  const availableSlots = useMemo(() => {
    return createTimeSlots().filter(slot => {
      const isBooked = bookedTimes.includes(slot);
      if (formData.date === getTodayLocalISO()) {
        const [h, m] = slot.split(":").map(Number);
        const now = new Date();
        const slotTime = new Date();
        slotTime.setHours(h, m, 0, 0);
        if (slotTime <= now) return false;
      }
      return !isBooked;
    });
  }, [bookedTimes, formData.date]);

  const handleNext = (nextStep) => setStep(nextStep);
  const handleBack = (prevStep) => setStep(prevStep);

  const handleVerification = async () => {
    setLoading(true);
    try {
      
      // 1. Generate code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      // 2. Store in DB
      const { error } = await supabase.from("appointments").insert([{
        patient_name: formData.name,
        patient_email: formData.email,
        patient_phone: formData.phone,
        appointment_date: formData.date,
        appointment_time: formData.time,
        doctor_id: formData.doctorId,
        service_id: formData.serviceId,
        verification_code: code,
        status: "pending",
        appointment_type: formData.userType,
        notes: formData.notes, // Sending notes to DB
      }]);

      if (error) throw error;

      toast.info(`Doğrulama kodu e-postanıza gönderildi: ${code} (Simülasyon)`);
      setStep(STEPS.VERIFICATION);
    } catch (error) {
      if (error.message.includes("duplicate key value")) {
        toast.error("Zaten bekleyen bir randevu talebiniz var. Lütfen e-postanızı kontrol edin.");
      } else {
        toast.error("Hata oluştu: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmAppointment = async () => {
    setLoading(true);
    try {
      // Drop .single() and instead sort by newest, grabbing the top 1
      const { data, error: fetchError } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_email", formData.email)
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      const appt = data?.[0]; // Safely extract the first item

      if (!appt || appt.verification_code !== formData.verificationCode) {
        throw new Error("Geçersiz doğrulama kodu.");
      }

      // Update the status to confirmed
      await supabase.from("appointments").update({ status: "confirmed" }).eq("id", appt.id);

      toast.success("Randevunuz başarıyla onaylandı!");
      setStep(STEPS.CONFIRMATION);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-20 flex items-center justify-center px-5 mb-10">
      <AnimatePresence mode="wait">

        {/* STEP: WELCOME */}
        {step === STEPS.WELCOME && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <img src="/images/simdent-logo.png" alt="Logo" className="h-24 mx-auto mb-6" />
            <h1 className="text-4xl font-black text-slate-900">Sim Dent Diş Kliniği</h1>
            <p className="text-xl text-slate-500 mt-2">Hoş geldiniz</p>
            <div className="mt-10 w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5 }}
                className="h-full bg-[#a88157]"
              />
            </div>
          </motion.div>
        )}

        {/* STEP: USER TYPE */}
        {step === STEPS.USER_TYPE && (
          <motion.div
            key="user_type"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="max-w-2xl w-full text-center"
          >
            <h2 className="text-3xl font-black text-slate-900 mb-10">Lütfen durumunuzu seçin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => { setFormData(prev => ({ ...prev, userType: 'new' })); handleNext(STEPS.SERVICE); }}
                className="p-8 rounded-3xl border-2 border-slate-100 hover:border-[#a88157] bg-white transition-all group text-left"
              >
                <div className="h-14 w-14 rounded-2xl bg-amber-50 text-[#a88157] flex items-center justify-center mb-6 group-hover:bg-[#a88157] group-hover:text-white transition-colors">
                  <UserPlus size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Yeni Hasta</h3>
                <p className="text-slate-500 mt-2">İlk kez randevu alıyorum</p>
              </button>
              <button
                onClick={() => { setFormData(prev => ({ ...prev, userType: 'registered' })); handleNext(STEPS.SERVICE); }}
                className="p-8 rounded-3xl border-2 border-slate-100 hover:border-[#a88157] bg-white transition-all group text-left"
              >
                <div className="h-14 w-14 rounded-2xl bg-amber-50 text-[#a88157] flex items-center justify-center mb-6 group-hover:bg-[#a88157] group-hover:text-white transition-colors">
                  <User size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Kayıtlı Hasta</h3>
                <p className="text-slate-500 mt-2">Daha önce randevu aldım</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP: SERVICE SELECTION */}
        {step === STEPS.SERVICE && (
          <motion.div
            key="service"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl w-full"
          >
            <button onClick={() => handleBack(STEPS.USER_TYPE)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-[#a88157] font-bold transition-colors">
              <ChevronLeft size={20} /> Geri Dön
            </button>
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Tedavi Alanını Seçin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setFormData(prev => ({ ...prev, serviceId: s.id })); handleNext(STEPS.DOCTOR_TIME); }}
                  className={`p-6 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
                    formData.serviceId === s.id ? "border-[#a88157] bg-amber-50 ring-4 ring-amber-100" : "border-slate-100 bg-white hover:border-[#a88157]"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${formData.serviceId === s.id ? "bg-[#a88157] text-white" : "bg-slate-100 text-slate-600"}`}>
                    <s.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.duration} dakika</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP: DOCTOR & TIME */}
        {step === STEPS.DOCTOR_TIME && (
          <motion.div
            key="doctor_time"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-5xl w-full"
          >
            <button onClick={() => handleBack(STEPS.SERVICE)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-[#a88157] font-bold transition-colors">
              <ChevronLeft size={20} /> Geri Dön
            </button>
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Doktor ve Tarih Seçin</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1 space-y-6">
                <p className="font-bold text-slate-700 mb-4">Hekim Seçimi</p>
                {["Dr. Ahmet Yılmaz", "Dr. Ayşe Kaya", "Dr. Mehmet Demir"].map((doc, i) => (
                  <button
                    key={i}
                    onClick={() => setFormData(prev => ({ ...prev, doctorId: `doc-${i}` }))}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                      formData.doctorId === `doc-${i}` ? "border-[#a88157] bg-amber-50" : "border-slate-100 bg-white hover:border-[#a88157]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200" />
                      <span className="font-bold text-slate-900">{doc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative w-full sm:w-64">
                    <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                      type="date"
                      min={getTodayLocalISO()}
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value, time: "" }))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#a88157]"
                    />
                  </div>
                  {formData.date && <p className="text-sm text-slate-500">Seçilen Tarih: <span className="font-bold text-slate-900">{formData.date}</span></p>}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {availableSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                      className={`py-3 rounded-xl text-sm font-bold transition-all ${
                        formData.time === slot ? "bg-[#a88157] text-white shadow-lg" : "bg-white border border-slate-200 text-slate-600 hover:border-[#a88157]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!formData.doctorId || !formData.date || !formData.time || loading}
                  onClick={() => handleNext(STEPS.USER_INFO)}
                  className="w-full py-4 rounded-2xl bg-[#a88157] text-white font-bold shadow-xl hover:bg-[#8b6945] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? "Yükleniyor..." : "Devam Et"} <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP: USER INFO */}
        {step === STEPS.USER_INFO && (
          <motion.div
            key="user_info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl w-full"
          >
            <button onClick={() => handleBack(STEPS.DOCTOR_TIME)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-[#a88157] font-bold transition-colors">
              <ChevronLeft size={20} /> Geri Dön
            </button>
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">İletişim Bilgileriniz</h2>
            <div className="space-y-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Ad Soyad</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#a88157]"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">E-posta</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#a88157]"
                  placeholder="ornek@email.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#a88157]"
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Şikayetiniz / Notunuz (İsteğe Bağlı)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#a88157] resize-none h-24"
                  placeholder="Kısaca şikayetinizi veya eklemek istediklerinizi belirtebilirsiniz..."
                />
              </div>
              <button
                disabled={!formData.name || !formData.email || !formData.phone || loading}
                onClick={handleVerification}
                className="w-full py-4 rounded-2xl bg-[#a88157] text-white font-bold shadow-xl hover:bg-[#8b6945] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? "İşleniyor..." : "Randevuyu Doğrula"} <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP: VERIFICATION */}
        {step === STEPS.VERIFICATION && (
          <motion.div
            key="verification"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="max-w-md w-full text-center"
          >
            <div className="h-20 w-20 rounded-full bg-amber-100 text-[#a88157] flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Doğrulama Kodu</h2>
            <p className="text-slate-500 mb-8">E-postanıza gönderilen 6 haneli kodu girerek randevunuzu onaylayın.</p>
            <div className="flex justify-center gap-2 mb-10">
              {[0,1,2,3,4,5].map(i => (
                <input
                  key={i}
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-[#a88157] outline-none"
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData(prev => ({ ...prev, verificationCode: (prev.verificationCode || "") + val }));
                    if(e.target.nextSibling) e.target.nextSibling.focus();
                  }}
                />
              ))}
            </div>
            <button
              disabled={formData.verificationCode?.length !== 6 || loading}
              onClick={confirmAppointment}
              className="w-full py-4 rounded-2xl bg-[#a88157] text-white font-bold shadow-xl hover:bg-[#8b6945] transition-all disabled:opacity-50"
            >
              {loading ? "Onaylanıyor..." : "Randevuyu Tamamla"}
            </button>
          </motion.div>
        )}

        {/* STEP: CONFIRMATION */}
        {step === STEPS.CONFIRMATION && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="h-20 w-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Randevunuz Onaylandı!</h2>
            <p className="text-slate-500 mb-10">Klinik ekibimiz sizinle iletişime geçecektir. Sizi görmek için sabırsızlanıyoruz.</p>
            <button
              onClick={() => navigate("/")}
              className="w-full py-4 rounded-2xl bg-[#a88157] text-white font-bold shadow-xl hover:bg-[#8b6945] transition-all"
            >
              Ana Sayfaya Dön
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}