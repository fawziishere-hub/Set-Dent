import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient"; 

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data }) => {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) throw new Error(authError.message);

      // 2. Fetch the profile by EMAIL (Bypasses the ID mismatch issue!)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Profile fetch error:", profileError);
      }

      // 3. Merge profile data
      const userWithRole = { 
        ...authData.user, 
        role: profile?.role || 'customer', 
        name: profile?.full_name || profile?.name || 'Kullanıcı'
      };

      return { session: authData.session, user: userWithRole };
    },
    
    onSuccess: (data) => {
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: data.session.access_token,
          user: data.user, 
        })
      );
      
      localStorage.setItem(
        "tokenExpiryTime",
        JSON.stringify(Date.now() + 24 * 60 * 60 * 1000)
      );
      
     
      // RBAC Route logic
      if (data.user.role === "admin") {
        toast.success("Yönetici girişi başarılı!");
        navigate("/admin", { replace: true });
      } else {
        toast.success("Başarıyla giriş yapıldı!");
        navigate("/dashboard", { replace: true });
      }
    },
    onError: (error) => {
      toast.error(error.message === "Invalid login credentials" ? "E-posta veya şifre hatalı" : error.message);
    },
  });

  return { mutate, isLoading, isSuccess };
};

export const useGmailLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred, please try again");
    },
  });

  return { mutate, isLoading, isSuccess };
};
