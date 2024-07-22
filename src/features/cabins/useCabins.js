import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const [searchParams] = useSearchParams();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: cabins, count } = {},
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["cabins", page],
    queryFn: () => getCabins({ page }),
    placeholderData: keepPreviousData,
  });

  return { isLoading, cabins, error, count, isPlaceholderData };
}

export default useCabins;
