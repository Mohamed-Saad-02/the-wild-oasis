import { Link } from "react-router-dom";
import styled from "styled-components";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  & > div,
  & > div:first-child > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  & > div:first-child {
    justify-content: flex-start;
  }

  & > div:first-child span {
    width: 100px;
    text-align: center;
  }

  & > div:last-child {
    justify-content: flex-end;
  }

  @media (max-width: 556px) {
    & > div {
      justify-content: space-between !important;
      flex-basis: 100%;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      <div>
        {status === "unconfirmed" && <Tag $type="green">Arriving</Tag>}
        {status === "checked-in" && <Tag $type="blue">Departing</Tag>}

        <div>
          <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
          <Guest>{guests.fullName}</Guest>
        </div>
      </div>
      <div>
        <div>{numNights} nights</div>

        {status === "unconfirmed" && (
          <Button
            $size="small"
            $variation="primary"
            as={Link}
            to={`/checkin/${id}`}
          >
            Checked in
          </Button>
        )}

        {status === "checked-in" && <CheckoutButton bookingId={id} />}
      </div>
    </StyledTodayItem>
  );
}

export default TodayItem;
