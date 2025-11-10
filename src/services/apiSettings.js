import axiosInstance from "../utils/axiosInstance";

export async function getSettings() {
  const response = await axiosInstance.get("settings");
  return response.data;
}

export async function updateSettings(newSetting) {
  const response = await axiosInstance.put("settings", newSetting);
  return response.data;
}
