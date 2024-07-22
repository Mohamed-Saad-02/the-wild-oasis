import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      toast.success("Booking successfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
