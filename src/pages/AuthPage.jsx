import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/auth&user/useLogin";
import { useRegister } from "../hooks/auth&user/useRegister";

const AuthPage = () => {
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  const { mutate: login, isLoading: isLoginLoading } = useLogin();
  const { mutate: signup, isLoading: isSignupLoading } = useRegister();

  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm({ defaultValues: { email: "", password: "" } });
  const { register: signupRegister, handleSubmit: handleSignupSubmit, watch: signupWatch, formState: { errors: signupErrors }, reset: signupReset } = useForm({ defaultValues: { name: "", email: "", password: "", confirmPassword: "" } });

  const password = signupWatch("password");

  const handleLogin = async (data) => login({ data });

  const handleSignup = async (data) => {
    const { confirmPassword, ...signupData } = data;
    signup(
      { data: { ...signupData, role: "customer" } },
      { onSuccess: () => { setIsLogin(true); signupReset(); } }
    );
  };

  if (token) return null;

  return (
    <div className="relative mt-20 min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-slate-950 px-4 py-20 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 md:grid-cols-2 border border-slate-100 dark:border-slate-800"
      >
        {/* Form Section */}
        <div className="flex flex-col justify-center p-8 md:p-12 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
            <motion.div className="mb-8 flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              {/* Real Logo Image */}
              <img 
                src="/images/unnamed.jpg" 
                alt="Sim Dent" 
                className="h-16 w-auto object-contain rounded-md border border-slate-100 shadow-sm"
              />
            </motion.div>

            <h1 className="mb-2 text-3xl font-black text-slate-900 dark:text-white md:text-4xl tracking-tight">
              {isLogin ? "Müşteri Girişi" : "Aramıza Katılın"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {isLogin
                ? "Hesabınıza giriş yaparak rezervasyonlarınızı yönetin."
                : "Sim Dent hesabınızı oluşturarak randevu taleplerinizi kolayca takip edin."}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} onSubmit={handleLoginSubmit(handleLogin)} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">E-Posta Adresi</label>
                  <div className="relative group">
                    <input type="email" {...loginRegister("email", { required: "E-posta gerekli" })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 ps-12 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none" placeholder="ornek@email.com" />
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Şifre</label>
                  <div className="relative group">
                    <input type={showPassword ? "text" : "password"} {...loginRegister("password", { required: "Şifre gerekli" })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pe-12 ps-12 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none" placeholder="••••••••" />
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm font-bold text-orange-500 hover:text-orange-600">Şifremi Unuttum</button>
                </div>

                <button type="submit" disabled={isLoginLoading} className="w-full rounded-xl bg-orange-500 py-4 font-bold text-white shadow-md hover:bg-orange-600 transition-all disabled:opacity-70">
                  {isLoginLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>

                <div className="text-center text-sm text-slate-500 mt-4">
                  Hesabınız yok mu? <button type="button" onClick={() => setIsLogin(false)} className="font-bold text-orange-500 hover:text-orange-600">Ücretsiz Kayıt Ol</button>
                </div>
              </motion.form>
            ) : (
              <motion.form key="signup" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} onSubmit={handleSignupSubmit(handleSignup)} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Ad Soyad</label>
                  <div className="relative group">
                    <input type="text" {...signupRegister("name", { required: "Ad Soyad gerekli" })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 ps-12 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none" placeholder="Adınız Soyadınız" />
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">E-Posta Adresi</label>
                  <div className="relative group">
                    <input type="email" {...signupRegister("email", { required: "E-posta gerekli" })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 ps-12 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none" placeholder="ornek@email.com" />
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Şifre</label>
                  <div className="relative group">
                    <input type={showPassword ? "text" : "password"} {...signupRegister("password", { required: "Şifre gerekli", minLength: { value: 6, message: "En az 6 karakter" } })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pe-12 ps-12 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none" placeholder="••••••••" />
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Şifre Tekrarı</label>
                  <div className="relative group">
                    <input type={showConfirmPassword ? "text" : "password"} {...signupRegister("confirmPassword", { required: "Şifre tekrarı gerekli", validate: (val) => val === password || "Şifreler eşleşmiyor" })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pe-12 ps-12 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none" placeholder="••••••••" />
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <button type="submit" disabled={isSignupLoading} className="w-full rounded-xl bg-orange-500 py-4 font-bold text-white shadow-md hover:bg-orange-600 transition-all mt-4 disabled:opacity-70">
                  {isSignupLoading ? "Kaydediliyor..." : "Hesap Oluştur"}
                </button>

                <div className="text-center text-sm text-slate-500 mt-4">
                  Zaten hesabınız var mı? <button type="button" onClick={() => setIsLogin(true)} className="font-bold text-orange-500 hover:text-orange-600">Giriş Yap</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Illustration Section (Garden Image) */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="hidden md:block relative">
          <img src="/images/unnamed (3).jpg" className="w-full h-full object-cover" alt="Sim Dent bekleme alanı" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h3 className="text-3xl font-black mb-3">Sim Dent’e Hoş Geldiniz</h3>
            <p className="text-sky-50 text-lg">Randevu taleplerinizi takip etmek ve hesabınızı yönetmek için giriş yapın.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
