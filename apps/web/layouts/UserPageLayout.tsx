import React from "react";
import layoutStyles from "./CampaignLayout.module.css";
import { styled } from "ui/src/theme";
import { Menu } from "ui";
import { MENU_DATA } from "@consts/menuLinks";
import { signOut, useSession } from "next-auth/react";
import { useMediaQuery } from "ui/src/hooks/useMediaQuery";
import { UrqlContext } from "@utils/createUrqlClient";
import { useRouter } from "next/router";
import { useGetUnreadNotificationsQuery } from "@generated/graphql";

const StyledRoot = styled("div", {
  backgroundColor: "#0D0A00",
});

const StyledMain = styled("main", {
  position: "relative",
  gridColumn: "1 / -1",
});

export interface ILayoutProps {
  children: React.ReactNode;
}

export const UserPageLayout: React.FC = ({ children }: ILayoutProps) => {
  const { resetUrqlClient } = React.useContext(UrqlContext);
  const { data: session } = useSession();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 900px)");

  const [{ data: notifications, fetching: fetchingNotifications }] =
    useGetUnreadNotificationsQuery();

  const handleSignOut = () => {
    signOut({
      redirect: false,
      callbackUrl: "/auth/signin",
    });
    resetUrqlClient();
    router.push("/auth/signin");
  };
  return (
    <StyledRoot>
      <Menu
        logo="/images/logotheinn.svg"
        menuLinks={isMobile ? MENU_DATA : MENU_DATA[0].children}
        notifications={notifications?.getUnreadNotifications}
        session={session}
        signOut={handleSignOut}
      />
      <div className={layoutStyles.mainLayout}>
        <StyledMain>{children}</StyledMain>
        {/* <Footer /> */}
      </div>
    </StyledRoot>
  );
};
