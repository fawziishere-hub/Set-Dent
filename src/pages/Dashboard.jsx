import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLogOut, FiCalendar, FiStar, FiHeart } from "react-icons/fi";
import { Profile } from "../components/Profile"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const tokenData = localStorage.getItem("token");
    if (!tokenData) {
      toast.error("Lütfen önce giriş yapın");
      navigate("/auth");
      return;
    }
    const user = JSON.parse(tokenData)?.user;
    setUser(user);
    setIsLoading(false);
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiryTime");
      toast.success("Başarıyla çıkış yapıldı");
      navigate("/");
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Çıkış yapılırken bir hata oluştu");
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#f6f9fc] dark:bg-slate-950 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="mb-2 text-3xl font-black text-slate-900 dark:text-white md:text-4xl">
              Müşteri Paneli
            </h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Hoş geldiniz. Randevu taleplerinizi ve profil bilgilerinizi buradan yönetebilirsiniz.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/randevu")}
              className="flex items-center gap-2 rounded-xl bg-[#0a6fa8] px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-[#075b8b]"
            >
              <FiCalendar className="text-lg" />
              Yeni Randevu Talebi
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-bold text-red-500 shadow-sm transition-all hover:bg-red-50 dark:border-slate-800 dark:bg-slate-900 dark:text-red-400"
            >
              <FiLogOut className="text-lg" />
              Çıkış Yap
            </button>
          </div>
        </motion.div>

        {/* Business Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              title: "Geçmiş Randevular",
              value: "2",
              icon: <FiCalendar />,
              bgColor: "bg-slate-800",
            },
            {
              title: "Randevu Talepleri",
              value: "2",
              icon: <FiStar />,
              bgColor: "bg-[#0a6fa8]",
            },
            {
              title: "Tedavi Tercihleri",
              value: "3",
              icon: <FiHeart />,
              bgColor: "bg-red-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl text-white ${stat.bgColor} shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Profile Component Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Profile userId={user?.id} />
        </motion.div>

      </div>
    </div>
  );
};

export default DashboardPage;
