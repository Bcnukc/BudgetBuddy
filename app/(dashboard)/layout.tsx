import AppNav from "@/components/ui/layout/nav";
import React from "react";
import { ModalProvider } from "@/components/modals";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <AppNav />
      <main className="flex-1 container p-6">
        <ModalProvider />
        {children}
      </main>
    </div>
  );
};

export default Layout;
