import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBooking() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //Now I am doing sortBy
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  //pagination
  const Page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, Page],
    queryFn: () => getBookings({ filter, sortBy, Page }),
  });

  const pageCount = Math.ceil(Page / PAGE_SIZE);

  if (Page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, Page + 1],
      queryFn: () => getBookings({ filter, sortBy, Page: Page + 1 }),
    });
  }

  if (Page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, Page - 1],
      queryFn: () => getBookings({ filter, sortBy, Page: Page - 1 }),
    });
  }
  return { isPending, error, bookings, count };
}
