import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "../context/ThemeContext";

import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 24rem 1fr;
    grid-template-rows: auto 1fr;
  }

  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: overlay;

  @media (max-width: 991px) {
    padding: 4rem 2.8rem 8.8rem;
  }

  @media (max-width: 575px) {
    padding: 1.2rem 2.2rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <ThemeProvider>
      <StyledAppLayout>
        <Header />
        <Sidebar />

        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </ThemeProvider>
  );
}

export default AppLayout;
