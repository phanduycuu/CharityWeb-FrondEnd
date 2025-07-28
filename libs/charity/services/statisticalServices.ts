import { axiosAuth } from "./axiosAuth";

export const getStatisticalUser = async () => {
  try {
    const response = await axiosAuth.get(`/campaign/getStatisticalUser`);
    return response;
  } catch (error) {
    throw error;
  }
};
