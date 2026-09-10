import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../hooks/auth&user/useForgotPassword";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { mutate: forgotPassword, isLoading } = useForgotPassword();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const email = watch("email");

  const onSubmit = (data) => {
    forgotPassword(
      { email: data.email },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          setTimeout(() => {
            navigate(`/reset-password?email=${encodeURIComponent(data.email)}`);
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
              onClick={() => navigate("/auth")}
              className="mb-6 flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Login</span>
            </motion.button>

            <h1 className="mb-2 text-3xl font-black text-black md:text-4xl">
              Reset Password 🔐
            </h1>
            <p className="text-gray-600 text-base">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600"
              >
                <span className="text-2xl">✓</span>
              </motion.div>
              <h3 className="mb-2 text-lg font-bold text-black">
                Check your email!
              </h3>
              <p className="text-center text-sm text-gray-600">
                We've sent a password reset link to{" "}
                <span className="font-semibold text-black">{email}</span>
              </p>
              <p className="mt-4 text-center text-xs text-gray-500">
                Redirecting to login page...
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block text-left text-sm font-semibold text-black">
                  Email Address
                </label>
                <motion.div whileHover={{ y: -2 }} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email format",
                      },
                    })}
                    className="relative w-full rounded-xl border border-gray-300/50 bg-white/10 px-4 py-3 ps-12 text-left text-black placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm hover:bg-white/20 hover:border-gray-300"
                    placeholder="example@email.com"
                  />
                  <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-400 group-hover:text-secondary-400 transition" />
                </motion.div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.email.message}
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
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </span>
              </motion.button>

              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <motion.button
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate("/auth")}
                  className="font-bold text-transparent bg-gradient-to-r from-primary-400 to-primary-800 bg-clip-text hover:from-primary-200 hover:to-secondary-200 transition"
                >
                  Login
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
