import React from "react";
import layoutStyles from "./CampaignLayout.module.css";
import { useSession } from "next-auth/react";
import { Menu } from "ui";
import { MENU_DATA } from "@consts/menuLinks";
import { useMediaQuery } from "ui/src/hooks/useMediaQuery";

export interface ILayoutProps {
  children: React.ReactNode;
}

export const CampaignLayout: React.FC = ({ children }: ILayoutProps) => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width: 900px)");
  return (
    <div className={layoutStyles.parent}>
      <Menu
        logo="/images/logotheinn.svg"
        menuLinks={isMobile ? MENU_DATA : MENU_DATA[0].children}
        session={session}
      />
      <div className="flex">
        <main className="relative col-span-full w-full">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
