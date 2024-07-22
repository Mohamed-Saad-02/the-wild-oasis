import styled from "styled-components";
import { useUser } from "./useUser";
import { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineX } from "react-icons/hi";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media (max-width: 575px) {
    order: 1;
    margin-right: auto;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPopupAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin: auto;
  gap: 3.2rem;

  & svg {
    font-size: 24px;
    cursor: pointer;
    width: fit-content;
    margin-left: auto;
  }
`;
const PopupAvatar = styled.img`
  display: block;
  border-radius: 1.4rem;
  width: 86rem;
`;

function UserAvatar() {
  const [isPopupAvatar, setIsPopupAvatar] = useState(false);

  const { user } = useUser();
  const { avatar, fullName } = user?.user_metadata;

  const closePopupAvatar = () => setIsPopupAvatar(false);

  const ref = useOutsideClick(closePopupAvatar);

  if (!fullName) return;

  return (
    <>
      <StyledUserAvatar>
        <Avatar
          src={avatar || "default-user.jpg"}
          alt={`Avatar of ${fullName}`}
          onClick={() => avatar && setIsPopupAvatar((show) => !show)}
        />
        <span>{fullName}</span>
      </StyledUserAvatar>

      {isPopupAvatar &&
        createPortal(
          <Overlay>
            <StyledPopupAvatar ref={ref}>
              <HiOutlineX onClick={closePopupAvatar} />
              <PopupAvatar src={avatar} alt={`Avatar of ${fullName}`} />
            </StyledPopupAvatar>
          </Overlay>,

          document.body
        )}
    </>
  );
}

export default UserAvatar;
