import React from "react";
import layoutStyles from "./CampaignLayout.module.css";
// import Footer from "@components/Footer";
import { Nav } from "@components/Nav";

export interface ILayoutProps {
  children: React.ReactNode;
}

export const CampaignLayout: React.FC = ({ children }: ILayoutProps) => {
  return (
    <div className={layoutStyles.parent}>
      <Nav />
      <div className={layoutStyles.mainLayout}>
        <main className="relative col-span-full">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
