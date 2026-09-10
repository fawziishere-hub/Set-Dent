import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const mutateDeleteAccount = async () => {
  const userToken = JSON.parse(localStorage.getItem("token"))?.token;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/user/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      }
    );
    if (res.ok) {
      return await res.json();
    }
    let error = await res.json();
    const errorMessage = error?.email?.[0] || "An unknown error occurred";
    throw new Error(errorMessage);
  } catch (error) {
    throw new Error(error.message || "An unknown error occurred");
  }
};

export const useDeleteAccount = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: () => mutateDeleteAccount(),
    onSuccess: (data) => {
      toast.success(t("toasts.profile.delete_success"));
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiryTime");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess };
};
