import { FilterCampaignUserRequest } from "@/libs/shared/charity/model/campaign.model";
import { axiosAuth } from "./axiosAuth";

export const getCampaign = async () => {
  try {
    const response = await axiosAuth.get(
      `/Campaign/getCampaign?page=1&limit=9`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCampaignById = async (id: string) => {
  try {
    const response = await axiosAuth.get(`/Campaign/getById/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const filterCampain = async (filter: FilterCampaignUserRequest) => {
  try {
    const response = await axiosAuth.post(`/Campaign/filter`, filter);
    return response;
  } catch (error) {
    throw error;
  }
};
