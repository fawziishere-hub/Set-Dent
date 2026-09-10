import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient";

export const useRegister = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data }) => {
      const { email, password, ...metaData } = data;

      const { data: authData, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: metaData, 
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return authData;
    },
    onSuccess: () => {
      toast.success("Account registered successfully.");
      window.location.reload();
      localStorage.removeItem("tracking_link_id");
    },
    onError: (error) => {
      toast.error(error.message || "Invalid data entered.");
    },
  });

  return { mutate, isLoading, isSuccess };
};