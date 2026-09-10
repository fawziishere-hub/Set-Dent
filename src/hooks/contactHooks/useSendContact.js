import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";

const mutateContact = async (data) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/contacts`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const useSendContact = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (data) => mutateContact(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["contact_messages"]);
      toast.success(
        "Contact request sent successfully, we will reply soon"
      );
    },
    onError: (error) => toast.error(error.message || "An error occurred, please try again"),
  });

  return { mutate, isLoading, isSuccess };
};
