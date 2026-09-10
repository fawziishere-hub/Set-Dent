import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCamera,
  FiSave,
  FiCheck,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useUpdateProfile } from "../hooks/auth&user/useUpdateProfile"; // Adjust path if needed

export const Profile = ({ userId }) => {
  const { mutate, isLoading, isSuccess } = useUpdateProfile();
  const [avatarPreview, setAvatarPreview] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    const user = JSON.parse(localStorage.getItem("token"))?.user;
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setAvatarPreview(user.image || "");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
    setValue("image", file);
  };

  const onSubmit = async (formData) => {
    const dataToUpdate = { ...formData };
    
    // Only send the image if a new file was uploaded
    if (!dataToUpdate.image) {
      delete dataToUpdate.image;
    }
    // Don't send empty passwords
    if (!dataToUpdate.currentPassword) delete dataToUpdate.currentPassword;
    if (!dataToUpdate.password) delete dataToUpdate.password;
    delete dataToUpdate.confirmPassword;

    mutate({ data: dataToUpdate });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:p-10">
      <div className="mb-8 flex items-center gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10">
          <FiUser className="text-3xl text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Hesap Bilgileri
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Kişisel bilgilerinizi ve iletişim detaylarınızı güncelleyin
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
        <div className="mb-8 flex flex-col items-center sm:items-start">
          <div className="group relative">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <FiUser className="text-5xl text-slate-400" />
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 shadow-lg transition-transform hover:scale-105"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : isSuccess ? (
                <FiCheck className="text-lg text-white" />
              ) : (
                <FiCamera className="text-lg text-white" />
              )}
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <FiUser className="text-blue-600" /> Ad Soyad
            </label>
            <input
              type="text"
              {...register("name", { required: "Ad Soyad gereklidir" })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <FiMail className="text-blue-600" /> E-Posta
            </label>
            <input
              type="email"
              {...register("email", { required: "E-Posta gereklidir" })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Phone */}
          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <FiPhone className="text-blue-600" /> Telefon Numarası
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Şifre Değiştirme</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* Current Password */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <FiLock className="text-blue-600" /> Mevcut Şifre
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...register("currentPassword")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Empty div to keep grid layout clean */}
            <div className="hidden md:block"></div>

            {/* New Password */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <FiLock className="text-blue-600" /> Yeni Şifre
              </label>
              <div className="relative">
                <input
                  type={showpassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button type="button" onClick={() => setShowpassword(!showpassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showpassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <FiLock className="text-blue-600" /> Şifreyi Onayla
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    validate: (value) => {
                      if (watch("password") && value !== watch("password")) return "Şifreler eşleşmiyor";
                    }
                  })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 flex w-full md:w-auto min-w-[200px] items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 px-8 font-bold text-white shadow-lg transition-all hover:bg-blue-700 disabled:opacity-70"
        >
          {isLoading ? (
            "Kaydediliyor..."
          ) : isSuccess ? (
            <><FiCheck size={20} /> Kaydedildi</>
          ) : (
            <><FiSave size={20} /> Değişiklikleri Kaydet</>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default Profile;