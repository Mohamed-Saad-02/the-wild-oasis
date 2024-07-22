import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useTheme } from "../context/ThemeContext";

const StyledSidebar = styled.aside`
  @media (min-width: 992px) {
    grid-row: 1 / -1;
    max-width: 28rem;
  }

  display: flex;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.2rem 2.4rem;

  @media (min-width: 576px) and (max-width: 991px) {
    justify-content: center;
    flex-direction: row;
    bottom: 0;
    left: 0;
    padding: 1.2rem 2.4rem;

    & > div:first-child {
      display: none;
    }
  }

  @media (max-width: 991px) {
    z-index: 90;
    position: fixed;
    width: 100%;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    padding: 0;
  }

  @media (max-width: 575px) {
    top: 0;
    left: -100%;
    width: 80%;
    max-width: 28rem;
    height: 100vh;
    transition: 0.3s;

    &.active {
      left: 0;
    }

    &.active .overlay {
      display: block;
      background-color: var(--color-grey-0);
      opacity: 0.5;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }
`;

const Overlay = styled.div`
  display: none;
`;

function Sidebar() {
  const { isActiveSidebar, dispatch } = useTheme();

  const handleActiveSidebar = () => dispatch({ type: "activeSidebar" });

  return (
    <StyledSidebar className={`${isActiveSidebar && "active"}`}>
      <Logo />
      <Overlay className="overlay" onClick={handleActiveSidebar}></Overlay>
      <MainNav isActiveSidebar={isActiveSidebar} dispatch={dispatch} />
    </StyledSidebar>
  );
}

export default Sidebar;
