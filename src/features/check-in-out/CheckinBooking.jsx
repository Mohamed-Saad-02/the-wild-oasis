import { useEffect, useState } from "react";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckIn";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);

  const { isLoading, booking = {} } = useBooking(); // Get Booking By ID
  const { checkin, isCheckingIn } = useCheckin(); // Update Check In
  const { settings: { breakfastPrice } = {}, isLoading: isLoadingSettings } =
    useSettings(); // Get Breakfast Price

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);

  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
  } = booking;

  const optionalBreakfastPrice = breakfastPrice * numNights * numGuests;

  const handleIsAddedBreakfast = `${formatCurrency(
    totalPrice + optionalBreakfastPrice
  )} (${formatCurrency(totalPrice)} + ${formatCurrency(
    optionalBreakfastPrice
  )})`;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakFast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    else checkin({ bookingId, breakfast: {} });
  };

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      {status === "unconfirmed" && (
        <Box>
          <Checkbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid((confirmed) => !confirmed)}
            disabled={confirmPaid || isCheckingIn}
            id="confirm"
          >
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {!addBreakFast
              ? formatCurrency(totalPrice)
              : handleIsAddedBreakfast}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            disabled={!confirmPaid || isCheckingIn}
            onClick={handleCheckin}
          >
            Check in booking #{bookingId}
          </Button>
        )}
        <Button
          $variation="secondary"
          onClick={moveBack}
          disabled={isCheckingIn}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
