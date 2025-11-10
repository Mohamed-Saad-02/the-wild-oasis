import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const status = searchParams.get("status");
  const filter =
    !status || status === "all" ? null : { field: "status", value: status };

  // SORT

  const sortByRaw = searchParams.get("sortBy") ?? "startDate-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings = [], metadata: { total: count } = {} } = {},
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
    placeholderData: keepPreviousData,
  });

  return { isLoading, bookings, count, error, isPlaceholderData };
}
