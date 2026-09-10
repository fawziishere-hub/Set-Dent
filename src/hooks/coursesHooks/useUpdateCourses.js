import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";

const mutateCourses = async (data, id) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/video-groups/${id}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const useUpdateCourses = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: ({ data, id }) => mutateCourses(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Course updated successfully");
    },
    onError: () => toast.error("An error occurred, please try again", "error"),
  });

  return { mutate, isLoading, isSuccess };
};
