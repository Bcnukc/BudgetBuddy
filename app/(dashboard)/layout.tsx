import AppNav from "@/components/ui/layout/nav";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <AppNav />
      <main className="flex-1 container p-6">{children}</main>
    </div>
  );
};

export default Layout;
