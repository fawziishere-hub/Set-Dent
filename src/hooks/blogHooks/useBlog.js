import { useQuery } from "react-query";

const fetchBlog = async (slug) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/blogs/${slug}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error; // Re-throw to be caught by react-query
  }
};

export const useBlog = (slug) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [`blog`, slug],
    queryFn: () => fetchBlog(slug),
    enabled: !!slug, // Only run query if slug is available
  });

  const blog = data?.blog || null;

  return {
    blog,
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
