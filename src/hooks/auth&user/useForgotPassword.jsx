import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient"; // <-- Verify this path!

export const useForgotPassword = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ email }) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success("Password reset email sent successfully! Check your inbox.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reset email");
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};

export const useResetPassword = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async ({ email, otp, password }) => {
      // Step 1: Verify the code
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery'
      });
      if (verifyError) throw new Error(verifyError.message);

      // Step 2: Update the password
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw new Error(updateError.message);
      
      return true;
    },
    onSuccess: () => {
      toast.success("Password reset successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });

  return { mutate, isLoading, isSuccess, isError, error };
};