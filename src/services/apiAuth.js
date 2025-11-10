import { toFormData } from "axios";
import axiosInstance from "../utils/axiosInstance";

export async function signup(data) {
  const response = await axiosInstance.post("users", data);

  return response.data;
}

export async function login({ email, password }) {
  const response = await axiosInstance.post("auth/login", { email, password });

  return response.data;
}

export async function getCurrentUser() {
  const response = await axiosInstance.get("users/me");

  return response.data;
}

export async function updateCurrentUser(data) {
  const response = await axiosInstance.put("users/me", toFormData(data), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
