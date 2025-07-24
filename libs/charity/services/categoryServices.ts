import { axiosAuth } from "./axiosAuth";

export const getCategory = async () => {
  try {
    const response = await axiosAuth.get(
      `/Category/getCategories?page=1&limit=10`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
