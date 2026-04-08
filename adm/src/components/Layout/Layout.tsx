import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  transition: margin-left 0.3s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Container>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onMenuClick={toggleSidebar} />
        <Main>{children}</Main>
      </div>
    </Container>
  );
}
