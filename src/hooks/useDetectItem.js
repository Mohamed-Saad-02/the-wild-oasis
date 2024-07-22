import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

// Detect Cabin or Booking when deleted there is no cabin or booking in current Page
function useDetectItem(count, system = "cabins") {
  const [searchParams, setSearchParams] = useSearchParams();

  const countBookingPage = count % PAGE_SIZE;

  const currentStatus =
    system === "bookings" ? searchParams.get("status") : null;
  const currentPage = searchParams.get("page");

  const handleDetect = () => {
    if (countBookingPage === 1) {
      if (currentPage && currentPage > 1) {
        if (currentStatus) searchParams.set("status", currentStatus);
        searchParams.set("page", currentPage - 1);
      } else {
        searchParams.set("page", 1);
        if (currentStatus) searchParams.set("status", "all");
      }

      setSearchParams(searchParams);
    }
  };

  return { handleDetect };
}

export default useDetectItem;
