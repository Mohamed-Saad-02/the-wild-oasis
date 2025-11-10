import { PAGE_SIZE } from "../utils/constants";

import axiosInstance from "../utils/axiosInstance";

export async function getBookings({ filter, sortBy, page }) {
  const response = await axiosInstance.get(
    `bookings?page=${page}&limit=${PAGE_SIZE}${
      filter ? `&status=${filter.value}` : ""
    }${sortBy ? `&sortBy=${sortBy.field}&sortOrder=${sortBy.direction}` : ""}`
  );

  return response.data;
}

export async function getBooking(id) {
  const response = await axiosInstance.get(`bookings/${id}`);

  return response.data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date) {
  const response = await axiosInstance.get(`bookings/after-date?date=${date}`);
  return response.data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const response = await axiosInstance.get(
    `bookings/recent-stays?date=${date}`
  );
  return response.data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const response = await axiosInstance.get(`bookings/today-activity`);
  return response.data;
}

export async function updateBooking(id, obj) {
  const response = await axiosInstance.put(`bookings/${id}`, obj);
  return response.data;
}

export async function deleteBooking(id) {
  const response = await axiosInstance.delete(`bookings/${id}`);

  return response.data;
}
