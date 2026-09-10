import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("No token found");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/comments`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        return await res.json();
      } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog"]);
      toast.success("Comment added successfully");
    },
    onError: () => toast.error("An error occurred, please try again", "error"),
  });

  return { mutate, isLoading, isSuccess };
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data, id }) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("No token found");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/comments/${id}`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        return await res.json();
      } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog"]);
      toast.success("Comment updated successfully");
    },
    onError: () => toast.error("An error occurred, please try again", "error"),
  });

  return { mutate, isLoading, isSuccess };
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (id) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("No token found");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/comments/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        return await res.json();
      } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog"]);
      toast.success("Comment deleted successfully");
    },
    onError: () => toast.error("An error occurred, please try again", "error"),
  });

  return { mutate, isLoading, isSuccess };
};

export const useCreateReplies = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("No token found");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/replies`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        return await res.json();
      } catch (error) {
        console.error("Error creating reply:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog"]);
      toast.success("Reply added successfully");
    },
    onError: () => toast.error("An error occurred, please try again", "error"),
  });

  return { mutate, isLoading, isSuccess };
};

export const useUpdateReplies = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data, id }) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("No token found");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/replies/${id}`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        return await res.json();
      } catch (error) {
        console.error("Error updating reply:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog"]);
      toast.success("Reply updated successfully");
    },
    onError: () => toast.error("An error occurred, please try again", "error"),
  });

  return { mutate, isLoading, isSuccess };
};

export const useDeleteReplies = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (id) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("No token found");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/replies/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        return await res.json();
      } catch (error) {
        console.error("Error deleting reply:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog"]);
      toast.success("Reply deleted successfully");
    },
    onError: () => toast.error("An error occurred, please try again", "error"),
  });

  return { mutate, isLoading, isSuccess };
};
