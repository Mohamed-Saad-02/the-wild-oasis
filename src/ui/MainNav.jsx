import {
  HiMiniCog6Tooth,
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
`;

const NavList = styled.ul`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;

  @media (min-width: 576px) and (max-width: 991px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    & li a {
      flex-direction: column;
      gap: 0.5rem !important;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav({ isActiveSidebar, dispatch }) {
  const handleCloseSidebar = () =>
    isActiveSidebar && dispatch({ type: "activeSidebar" });

  return (
    <Nav>
      <NavList>
        <li>
          <StyledNavLink to="/" onClick={handleCloseSidebar}>
            <HiOutlineHome /> <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings" onClick={handleCloseSidebar}>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins" onClick={handleCloseSidebar}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users" onClick={handleCloseSidebar}>
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings" onClick={handleCloseSidebar}>
            <HiMiniCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </Nav>
  );
}

export default MainNav;
