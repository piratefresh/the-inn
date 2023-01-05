import React from "react";
import layoutStyles from "./RootLayout.module.css";
// import Footer from "@components/Footer";
import { Nav } from "@components/Nav";

export interface ILayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Nav />
      <div className="">
        <main className="relative col-span-full">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
