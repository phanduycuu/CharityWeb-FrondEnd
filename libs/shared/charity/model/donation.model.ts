export type Donation = {
  id: string;
  donorName: string;
  amount: number;
  donatedAt: string;
};
export type Page = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
};
