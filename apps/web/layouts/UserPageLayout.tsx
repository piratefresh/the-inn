import React from "react";
import layoutStyles from "./CampaignLayout.module.css";
import { Nav } from "@components/Nav";
import { styled } from "ui/src/theme";

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
  return (
    <StyledRoot>
      <Nav />
      <div className={layoutStyles.mainLayout}>
        <StyledMain>{children}</StyledMain>
        {/* <Footer /> */}
      </div>
    </StyledRoot>
  );
};
