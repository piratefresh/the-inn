import { MENU_DATA } from "@consts/menuLinks";
import { useSession } from "next-auth/react";
import React from "react";
import { Menu } from "ui";
import { useMediaQuery } from "ui/src/hooks/useMediaQuery";

export interface ILayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC = ({ children }: ILayoutProps) => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width: 900px)");
  return (
    <div>
      <Menu
        logo="/images/logotheinn.svg"
        menuLinks={isMobile ? MENU_DATA : MENU_DATA[0].children}
        session={session}
      />
      <div className="">
        <main className="relative col-span-full">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
