import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPassword } from "../hooks/auth&user/useForgotPassword";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: resetPassword, isLoading } = useResetPassword();

  const email = searchParams.get("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: email,
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    resetPassword(
      {
        email: data.email,
        otp: data.otp,
        password: data.password,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            navigate("/auth");
          }, 2000);
        },
      },
    );
  };

  return (
    <div className="relative mt-20 min-h-screen flex items-center justify-center bg-primary-50 px-4 py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-600/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white/10 shadow-2xl dark:bg-gray-800/20 backdrop-blur-xl border border-white/20"
      >
        <div className="flex flex-col justify-center p-8 md:p-12 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => navigate("/forgot-password")}
              className="mb-6 flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back</span>
            </motion.button>

            <h1 className="mb-2 text-3xl font-black text-black md:text-4xl">
              Create New Password 🔑
            </h1>
            <p className="text-gray-600 text-base">
              Enter the OTP from your email and set a new password
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Email Field - Read Only */}
            <div>
              <label className="mb-2 block text-left text-sm font-semibold text-black">
                Email Address
              </label>
              <motion.div whileHover={{ y: -2 }} className="relative group">
                <input
                  type="email"
                  {...register("email")}
                  disabled
                  className="relative w-full rounded-xl border border-gray-300/50 bg-gray-100/50 px-4 py-3 text-left text-gray-600 placeholder-gray-400 transition-all cursor-not-allowed"
                />
              </motion.div>
            </div>

            {/* OTP Field */}
            <div>
              <label className="mb-2 block text-left text-sm font-semibold text-black">
                Verification Code (OTP)
              </label>
              <motion.div whileHover={{ y: -2 }} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <input
                  type="text"
                  {...register("otp", {
                    required: "Verification code is required",
                    minLength: {
                      value: 6,
                      message: "Code should be at least 6 characters",
                    },
                  })}
                  className="relative w-full rounded-xl border border-gray-300/50 bg-white/10 px-4 py-3 text-center text-black placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm hover:bg-white/20 hover:border-gray-300 text-xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </motion.div>
              {errors.otp && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.otp.message}
                </motion.p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Check your email for the verification code
              </p>
            </div>

            {/* New Password Field */}
            <div>
              <label className="mb-2 block text-left text-sm font-semibold text-black">
                New Password
              </label>
              <motion.div whileHover={{ y: -2 }} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should be at least 8 characters",
                    },
                  })}
                  className="relative w-full rounded-xl border border-gray-300/50 bg-white/10 px-4 py-3 pe-12 ps-12 text-left text-black placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm hover:bg-white/20 hover:border-gray-300"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-12 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-400 group-hover:text-secondary-400 transition" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-gray-300 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </motion.button>
              </motion.div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="mb-2 block text-left text-sm font-semibold text-black">
                Confirm Password
              </label>
              <motion.div whileHover={{ y: -2 }} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="relative w-full rounded-xl border border-gray-300/50 bg-white/10 px-4 py-3 pe-12 ps-12 text-left text-black placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm hover:bg-white/20 hover:border-gray-300"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-12 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-400 group-hover:text-secondary-400 transition" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-gray-300 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </motion.button>
              </motion.div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="relative w-full rounded-xl bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 py-3 font-bold text-white shadow-lg transition-all hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-secondary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition duration-300" />
              <span className="relative">
                {isLoading ? "Resetting..." : "Reset Password"}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
