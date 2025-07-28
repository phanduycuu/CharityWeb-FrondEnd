import exp from "constants";
import { Category } from "./category.model";
import { User } from "./user.model";

export type Campaign = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goalAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
  createdBy: User;
  category: Category;
  status: string;
};

export type FilterCampaignUserRequest = {
  searchKey?: string | null;
  categoryId?: string | null;
  page?: number | null;
  limit: number;
};
