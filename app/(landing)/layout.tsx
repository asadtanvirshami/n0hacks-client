import MainLayout from "@/components/app/layout/main-layout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout children={children}/>
};

export default Layout;
