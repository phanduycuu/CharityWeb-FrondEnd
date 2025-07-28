import { Payment as PaymentMoney } from "@/libs/shared/charity/model/payment.model";
import { axiosAuth } from "./axiosAuth";

export const PaymentPost = async (data: PaymentMoney) => {
  try {
    const response = await axiosAuth.post(
      "http://localhost:5006/api/payment/create",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
