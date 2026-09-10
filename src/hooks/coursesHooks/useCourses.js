import { useQuery } from "react-query";

const fetchCourses = async (params = {}) => {
  const { filters, search, sorting, pagination } = params;
  const queryParams = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(`${key}`, value);
    });
  }
  if (search) {
    Object.entries(search).forEach(([key, value]) => {
      if (value) queryParams.append(`${key}`, value);
    });
  }
  if (sorting) {
    Object.entries(sorting).forEach(([key, value]) => {
      if (value) queryParams.append(`${key}`, value);
    });
  }
  if (pagination) {
    Object.entries(pagination).forEach(([key, value]) => {
      if (value) queryParams.append(`${key}`, value);
    });
  }

  try {
    const url = `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/api/courses?${queryParams.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useCourses = (params) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Courses", params],
    queryFn: () => fetchCourses(params),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
