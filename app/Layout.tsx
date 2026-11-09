import type { ReactNode } from "react";

import Navbar from "./navbar/Navbar";
import Sidebar from "./navbar/Sidebar";

type LayoutProps = {
  children: ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  onSearch: (value: string) => void;
};

function Layout({ children, activePage, onNavigate, onSearch }: LayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      <div className="main-area">
        <Navbar onSearch={onSearch} />

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
