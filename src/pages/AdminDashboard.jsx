import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Search, 
  Bell, 
  LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; 
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [reservationsLoading, setReservationsLoading] = useState(true);
  
  // NEW: Search state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Randevu talepleri yüklenirken bir hata oluştu.");
    } finally {
      setReservationsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiryTime");
    toast.success("Başarıyla çıkış yapıldı.");
    navigate("/auth");
    window.location.reload();
  };

  const handleApprove = async (id) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: "Onaylandı" } : res
    ));

    const { error } = await supabase
      .from('reservations')
      .update({ status: "Onaylandı" })
      .eq('id', id);

    if (error) {
      toast.error("Onaylanamadı: " + error.message);
      fetchReservations(); 
      return;
    }

    toast.success("Randevu talebi onaylandı!");
  };

  const handleNotificationClick = () => {
    toast.info("Şu an okunmamış yeni bir bildiriminiz yok.");
  };

  // NEW: Filter logic for the Search Bar
  const filteredReservations = reservations.filter((res) => {
    const term = searchQuery.toLowerCase();
    const name = (res.full_name || res.ad_soyad || "").toLowerCase();
    const phone = res.phone || res.telefon || "";
    return name.includes(term) || phone.includes(term);
  });

  const pendingCount = reservations.filter((r) => r.status !== "Onaylandı").length;
  const approvedCount = reservations.filter((r) => r.status === "Onaylandı").length;

  return (
    <div className="min-h-screen bg-slate-50 flex dark:bg-slate-950">
      
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex fixed h-full z-20">
        <div className="p-6 flex items-center gap-4 border-b border-slate-800">
          <img src="/images/unnamed.jpg" alt="Sim Dent" className="w-12 h-12 rounded-full object-cover border-2 border-sky-400 shadow-md" />
          <span className="text-2xl font-black tracking-tight text-white">Sim Dent <span className="text-sky-400">Yönetim</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-orange-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20">
            <Calendar size={20} /> Randevular
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:text-white hover:bg-red-500 rounded-xl font-medium transition-all">
            <LogOut size={20} /> Çıkış Yap
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-6 lg:p-10">
        
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Yönetim Paneli</h1>
            <p className="text-slate-500 font-medium mt-1">Gelen randevu taleplerini yönetin.</p>
          </div>
          <div className="flex items-center gap-4">
            
            {/* FUNCTIONAL SEARCH BAR */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="İsim veya Telefon ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:border-orange-500 shadow-sm transition-all" 
              />
            </div>
            
            {/* FUNCTIONAL NOTIFICATION BELL */}
            <button 
              onClick={handleNotificationClick}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-600 hover:text-orange-500 shadow-sm relative transition-colors"
            >
              <Bell size={20} />
              {pendingCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
              )}
            </button>

          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center"><Clock size={28} /></div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Bekleyen İstekler</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{reservationsLoading ? "…" : pendingCount}</h3>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle size={28} /></div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Onaylanan Randevular</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{reservationsLoading ? "…" : approvedCount}</h3>
            </div>
          </motion.div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {searchQuery ? "Arama Sonuçları" : "Tüm Randevular"}
            </h2>
          </div>
          <div className="overflow-x-auto">
            {reservationsLoading ? (
              <p className="p-6 text-slate-500 text-sm font-medium">Yükleniyor...</p>
            ) : filteredReservations.length === 0 ? (
              <p className="p-6 text-slate-500 text-sm font-medium">Kayıt bulunamadı.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-bold">Müşteri</th>
                    <th className="px-6 py-4 font-bold">Tarih / Saat</th>
                    <th className="px-6 py-4 font-bold">Detay</th>
                    <th className="px-6 py-4 font-bold">Durum</th>
                    <th className="px-6 py-4 font-bold">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 dark:text-white">{res.full_name || res.ad_soyad}</p>
                        <p className="text-xs text-slate-500">{res.phone || res.telefon}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {res.appointment_date || res.reservation_date || res.tarih} <br/> <span className="text-slate-400">{res.appointment_time || res.reservation_time || res.saat}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                        <span className="font-bold text-slate-900 dark:text-white">{res.doctor_id || "Belirtilmemiş"}</span> <br/>
                        <span className="text-slate-400">{res.service_id || res.guest_count || res.area_preference || res.tercih_yeri}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold text-center ${
                            res.status === "confirmed" || res.status === "Onaylandı" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          }`}>
                            {res.status || "Bekliyor"}
                          </span>
                          {res.verification_code && <span className="text-[10px] font-mono mt-1 text-slate-400">Kod: {res.verification_code}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {res.status !== "Onaylandı" && (
                          <button onClick={() => handleApprove(res.id)} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 transition-colors shadow-sm">
                            Onayla
                          </button>
                        )}
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
