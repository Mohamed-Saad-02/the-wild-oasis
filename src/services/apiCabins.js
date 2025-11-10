import { toFormData } from "axios";
import axiosInstance from "../utils/axiosInstance";
import { PAGE_SIZE } from "../utils/constants";

export async function getCabins({ page }) {
  const response = await axiosInstance.get(
    `cabins?page=${page}&limit=${PAGE_SIZE}`
  );
  return response.data;
}

export async function createCabin(newCabin) {
  const response = await axiosInstance.post("cabins", toFormData(newCabin), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

export async function updateCabin(id, newCabin) {
  const response = await axiosInstance.put(
    `cabins/${id}`,
    toFormData(newCabin),
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
}

export async function deleteCabin(id) {
  const response = await axiosInstance.delete(`cabins/${id}`);
  return response.data;
}
