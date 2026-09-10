import { useQuery } from "react-query";

const fetchCategories = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/sub-categories`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useCategories = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`Categories`],
    queryFn: () => fetchCategories(),
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
