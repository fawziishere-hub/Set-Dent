import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle,
  Search,
  Bell,
  UserCheck,
  User
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Randevular yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: "confirmed" })
        .eq('id', id);

      if (error) throw error;

      toast.success("Randevu onaylandı!");
      fetchAppointments();
    } catch (error) {
      toast.error("Onaylanamadı: " + error.message);
    }
  };

  const handleCheckIn = async (id) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: "arrived" })
        .eq('id', id);

      if (error) throw error;

      toast.success("Hasta giriş yaptı (Check-in başarılı)!");
      fetchAppointments();
    } catch (error) {
      toast.error("Giriş işlemi başarısız: " + error.message);
    }
  };

  const filteredAppointments = appointments.filter((app) => {
    const term = searchQuery.toLowerCase();
    return (
      (app.patient_name || "").toLowerCase().includes(term) ||
      (app.patient_phone || "").toLowerCase().includes(term) ||
      (app.verification_code || "").toLowerCase().includes(term)
    );
  });

  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const arrivedCount = appointments.filter((a) => a.status === "arrived").length;

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex">

      <aside className="w-64 bg-[#4a3728] text-[#fdfbf7] flex flex-col hidden md:flex fixed h-full z-20">
        <div className="p-6 flex items-center gap-4 border-b border-white/10">
          <img src="/images/simdent-logo.png" alt="Sim Dent" className="w-10 h-10 object-contain brightness-0 invert" />
          <span className="text-xl font-black tracking-tight text-white">Sim Dent <span className="text-[#d4b483]">Yönetim</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#a88157] text-white rounded-xl font-bold transition-all shadow-lg shadow-black/20">
            <Calendar size={20} /> Randevular
          </a>
        </nav>
        <div className="p-6 text-center text-white/40 text-xs">
          Sim Dent Clinic System v1.0
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-6 lg:p-10">

        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Yönetim Paneli</h1>
            <p className="text-slate-500 font-medium mt-1">Randevuları ve hasta girişlerini yönetin.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="İsim, Telefon veya Kod ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-72 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-[#a88157] shadow-sm transition-all"
              />
            </div>
            <button
              className="p-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-[#a88157] shadow-sm relative transition-colors"
            >
              <Bell size={20} />
              {pendingCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#a88157] rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center"><Clock size={28} /></div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Bekleyenler</p>
              <h3 className="text-3xl font-black text-slate-900">{loading ? "…" : pendingCount}</h3>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center"><Calendar size={28} /></div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Onaylananlar</p>
              <h3 className="text-3xl font-black text-slate-900">{loading ? "…" : confirmedCount}</h3>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center"><UserCheck size={28} /></div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Klinikte Olanlar</p>
              <h3 className="text-3xl font-black text-slate-900">{loading ? "…" : arrivedCount}</h3>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-900">
              {searchQuery ? `"${searchQuery}" için sonuçlar` : "Tüm Randevu Kayıtları"}
            </h2>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center text-slate-500 font-medium">Yükleniyor...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="p-20 text-center text-slate-500 font-medium">Kayıt bulunamadı.</div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Hasta Bilgileri</th>
                    <th className="px-6 py-4 font-bold">Tarih / Saat</th>
                    <th className="px-6 py-4 font-bold">Tedavi / Doktor</th>
                    <th className="px-6 py-4 font-bold">Kod / Durum</th>
                    <th className="px-6 py-4 font-bold text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                            <User size={16} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{app.patient_name}</p>
                            <p className="text-xs text-slate-500">{app.patient_phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                        {app.appointment_date} <br/> <span className="text-slate-400">{app.appointment_time}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <p className="font-bold text-slate-900">{app.service_id || "Belirtilmemiş"}</p>
                        <p className="text-xs text-slate-400">{app.doctor_id || "Doktor atanmadı"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase text-center w-fit ${
                            app.status === "arrived" ? "bg-green-100 text-green-700" :
                            app.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                            "bg-orange-100 text-orange-700"
                          }`}>
                            {app.status === "arrived" ? "Klinikte" : app.status === "confirmed" ? "Onaylı" : "Bekliyor"}
                          </span>
                          {app.verification_code && <span className="text-xs font-mono mt-1 text-slate-400 font-bold">Kod: {app.verification_code}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {app.status === "pending" && (
                            <button onClick={() => handleApprove(app.id)} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#a88157] transition-colors">
                              Onayla
                            </button>
                          )}
                          {app.status === "confirmed" && (
                            <button onClick={() => handleCheckIn(app.id)} className="bg-[#a88157] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#8b6945] transition-colors flex items-center gap-2 shadow-md shadow-amber-200">
                              <UserCheck size={14} /> Giriş Yap (Check-in)
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
