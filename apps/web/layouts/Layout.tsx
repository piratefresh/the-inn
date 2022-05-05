import React from "react";
import layoutStyles from "./layout.module.css";
// import Footer from "@components/Footer";
import { Nav } from "@components/Nav";

export interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Nav />
      <div className={`${layoutStyles.mainLayout}`}>
        <main className="relative col-span-full">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
