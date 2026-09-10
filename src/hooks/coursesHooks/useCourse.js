import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useCourse = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`Courses` + id],
    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem("token"))?.token;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/courses/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export const useMyCourses = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`MyCourses`],

    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem("token"))?.token;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/my-subscriptions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export const useCourseSections = (id) => {
  const token = JSON.parse(localStorage.getItem("token"))?.token;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`courses + ${id} + sections`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/sections`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          return await res.json();
        }
        let error = await res.json();
        if (!res.ok) {
          throw new Error(error?.email);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export const usePostBuyCourse = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: async ({ course_id, user_id, price }) => {
      const userToken = JSON.parse(localStorage.getItem("token"))?.token;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/subscriptions`,
          {
            method: "POST",
            body: JSON.stringify({ course_id, user_id, price }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (res.ok) {
          return await res.json();
        }
        let error = await res.json();
        if (!res.ok) {
          throw new Error(error?.email);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Courses" + data?.course_id]);
      toast.success("Your request has been sent successfully and we will contact you!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isLoading, isSuccess, isError };
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const token = JSON.parse(localStorage.getItem("token"))?.token;
      if (!token) throw new Error("No token found");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/reviews`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        return await res.json();
      } catch (error) {
        console.error("Error creating review:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Courses" + data?.data?.course_id]);
      toast.success("Review added successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isLoading, isSuccess };
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data, id }) => {
      delete data.course_id;
      const token = JSON.parse(localStorage.getItem("token"))?.token;
      if (!token) throw new Error("No token found");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/reviews/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        return await res.json();
      } catch (error) {
        console.error("Error updating review:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Courses" + data?.data?.course_id]);
      toast.success("Review updated successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isLoading, isSuccess };
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ id, course_id }) => {
      const token = JSON.parse(localStorage.getItem("token"))?.token;
      if (!token) throw new Error("No token found");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/reviews/${id}`,
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
        console.error("Error deleting review:", error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["Courses" + variables?.course_id]);
      toast.success("Review deleted successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isLoading, isSuccess };
};
