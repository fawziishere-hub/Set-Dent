import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetAddresses = () => {
  const { t } = useTranslation();
  const token = JSON.parse(localStorage.getItem("token"))?.token;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [`addresses`],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/addresses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: t("toasts.address.fetch_failed"),
        }));
        throw new Error(errorData.message || t("toasts.address.fetch_failed"));
      }
      return response.json();
    },
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess, isError, data } = useMutation({
    mutationFn: async (data) => {
      const token = JSON.parse(localStorage.getItem("token"))?.token;
      if (!token) {
        throw new Error(t("toasts.login_required"));
      }
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/addresses`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          message: t("toasts.address.add_failed"),
        }));
        throw new Error(errorData.message || t("toasts.address.add_failed"));
      }

      return res.json();
    },

    onSuccess: (data) => {
      toast.success(t("toasts.address.add_success"));
      queryClient.invalidateQueries("addresses");
    },
    onError: (error) => {
      toast.error(error?.message || error || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess, isError, data };
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess, isError, data } = useMutation({
    mutationFn: async (data) => {
      const token = JSON.parse(localStorage.getItem("token"))?.token;
      if (!token) {
        throw new Error(t("toasts.login_required"));
      }
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/addresses/${data.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          message: t("toasts.address.update_failed"),
        }));
        throw new Error(errorData.message || t("toasts.address.update_failed"));
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success(t("toasts.address.update_success"));
      queryClient.invalidateQueries("addresses");
    },
    onError: (error) => {
      toast.error(error?.message || error || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess, isError, data };
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess, isError, data } = useMutation({
    mutationFn: async (id) => {
      const token = JSON.parse(localStorage.getItem("token"))?.token;
      if (!token) {
        throw new Error(t("toasts.login_required"));
      }
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/addresses/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          message: t("toasts.address.delete_failed"),
        }));
        throw new Error(errorData.message || t("toasts.address.delete_failed"));
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success(t("toasts.address.delete_success"));
      queryClient.invalidateQueries("addresses");
    },
    onError: (error) => {
      toast.error(error?.message || error || t("toasts.error_try_again"));
    },
  });

  return { mutate, isLoading, isSuccess, isError, data };
};
