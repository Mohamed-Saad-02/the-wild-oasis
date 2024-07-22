import styled from "styled-components";
import { HiBars3 } from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";

import HeaderMenu from "./HeaderMenu";
import Button from "./Button";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;

  & button.bars {
    background-color: #eee;
    padding: 6px 8px;
    border-radius: 6px;
    border: 0;
    font-size: 24px;
    transition: 0.3s;
    display: none;
    color: black;
  }

  & button.bars:hover {
    background-color: #ddd;
  }

  @media (max-width: 575px) {
    justify-content: flex-end;

    padding: 1.2rem 2.2rem;

    & button.bars {
      display: block;
      order: 2;
    }
  }
`;

function Header() {
  const { dispatch } = useTheme();

  const handleActiveSidebar = () => dispatch({ type: "activeSidebar" });

  return (
    <StyledHeader>
      <Button className="bars" onClick={handleActiveSidebar}>
        <HiBars3 />
      </Button>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
