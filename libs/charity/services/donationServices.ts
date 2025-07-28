import { axiosAuth } from "./axiosAuth";

export const getDoantionbByCampaignById = async (
  id: string,
  page: number,
  pageSize: number
) => {
  try {
    const response = await axiosAuth.get(
      `/donation/getDonationByidCampaign?id=${id}&page=${page}&limit=${pageSize}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
