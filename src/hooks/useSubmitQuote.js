import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient"; // <-- IMPORTANT: Make sure this path points correctly to your new supabaseClient.js file!

export const useSubmitQuote = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (data) => {
      // Send the form data directly to your new Supabase 'quotes' table
      const { data: responseData, error } = await supabase
        .from('quotes')
        .insert([data])
        .select();

      // Supabase returns errors nicely, we just throw them to trigger the onError block
      if (error) {
        throw new Error(error.message);
      }

      return responseData;
    },
    onSuccess: () => {
      toast.success("Teklif talebiniz başarıyla alındı!");
    },
    onError: (error) => {
      toast.error(error.message || "Bağlantı hatası: Lütfen tekrar deneyin.");
    },
  });

  return { mutate, isLoading, isSuccess };
};