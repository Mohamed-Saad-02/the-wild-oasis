import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import axiosInstance from "../utils/axiosInstance";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { getCabins } from "../services/apiCabins";


// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
   const response = await axiosInstance.delete("guests");
   return response.data;
}

async function deleteCabins() {
  const response = await axiosInstance.delete("cabins");
  return response.data;
}

async function deleteBookings() {
    const response = await axiosInstance.delete("bookings");
  return response.data;
}

async function createGuests() {
  const response = await axiosInstance.post("guests/bulk", guests);
  return response.data;
}

async function createCabins() {
  await Promise.all(
    cabins.map(async (cabin) => {
      const formData = new FormData();

      formData.append("name", cabin.name);
      formData.append("maxCapacity", cabin.maxCapacity);
      formData.append("regularPrice", cabin.regularPrice);
      formData.append("discount", cabin.discount);
      formData.append("description", cabin.description);

      // ✅ نحول الصورة من URL إلى Blob
      const res = await fetch(cabin.image);
      const blob = await res.blob();
      console.log(blob);
      formData.append("image", blob);


      const response = await axiosInstance.post("cabins", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    })
  );
}


async function createBookings() {
  const guestsResponse = await axiosInstance.get("guests");
  const allGuestIds = guestsResponse.data.map((guest) => guest.id);
    
  const cabinsResponse = await getCabins({ page: 1 });
  const allCabinIds = cabinsResponse.data.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const response = await axiosInstance.post("bookings/bulk", finalBookings);
  return response.data;
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    await deleteCabins();
    await deleteGuests();
    await deleteBookings();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
