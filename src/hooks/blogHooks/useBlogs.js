import { useQuery } from "react-query";

const fetchBlogs = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/blogs`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useBlogs = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`Blogs`],
    queryFn: () => fetchBlogs(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
