import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { supabase } from "../../supabaseClient"; // <-- Verify this path!

export const usePasswordReset = () => {
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ data }) => {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      toast.success(t("toasts.password_reset.request_sent"));
    },
    onError: (error) => {
      toast.error(error.message || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};

export const usePasswordConfirmCode = () => {
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ data }) => {
      // Supabase checks the 6-digit code sent to the email
      const { error } = await supabase.auth.verifyOtp({
        email: data.email,
        token: data.code || data.otp, 
        type: 'recovery'
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      toast.success(t("toasts.password_reset.code_confirmed"));
    },
    onError: (error) => {
      toast.error(error.message || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};

export const useUpdatePassword = () => {
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ data }) => {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      toast.success(t("toasts.password_reset.update_success"));
    },
    onError: (error) => {
      toast.error(error.message || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};