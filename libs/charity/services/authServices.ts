import {
  LoginForm,
  RegisterForm,
} from "@/libs/shared/charity/model/auth.model";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data: LoginForm) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response; // Trả về dữ liệu có cấu trúc đúng
  } catch (error) {
    throw error;
  }
};

export const Register = async (data: RegisterForm) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response; // Trả về dữ liệu có cấu trúc đúng
  } catch (error) {
    throw error;
  }
};
