import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient";

export const useUpdateProfile = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data }) => {
      // 1. Get the currently logged-in user
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw new Error(authError.message);

      const userId = authData.user.id;

      // 2. Map the data safely to match the SQL table we built earlier
      const updatePayload = {
        full_name: data.full_name || data.name,
        phone: data.phone,
        company_name: data.company_name,
      };

      // Clean up the payload so we don't accidentally send undefined values
      Object.keys(updatePayload).forEach(
        (key) => updatePayload[key] === undefined && delete updatePayload[key]
      );

      // 3. Update the 'profiles' table in Supabase
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update(updatePayload)
        .eq('id', userId)
        .select()
        .single();

      if (updateError) throw new Error(updateError.message);

      // We merge the auth data and profile data so your frontend localStorage gets everything it needs
      return { user: { ...authData.user, ...updatedProfile } };
    },
    
    // We kept your exact original onSuccess logic so the UI doesn't break!
    onSuccess: (data) => {
      const userToken = JSON.parse(localStorage.getItem("token"));
      if (userToken) {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: userToken.token,
            user: data.user,
          })
        );
      }
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred, please try again");
    },
  });

  return { mutate, isLoading, isSuccess };
};