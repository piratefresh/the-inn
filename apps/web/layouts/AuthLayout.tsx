import { useMediaQuery } from "@hooks/useMediaQueries";
import React from "react";
import { LayoutProps } from "Types/LayoutPage";
import { mediaString } from "ui";
import layoutStyles from "./AuthLayout.module.css";

export interface ILayoutProps {
  children: React.ReactNode;
  layoutProps: LayoutProps;
}

export const AuthLayout: React.FC = ({
  children,
  layoutProps,
}: ILayoutProps) => {
  const isDesktop = useMediaQuery(mediaString.lg);
  return (
    <div className={`${layoutStyles.mainLayout}`}>
      <div>
        {isDesktop && (
          <img className="h-screen" src={layoutProps.meta.sideImage} />
        )}
      </div>
      <main className="relative">{children}</main>
    </div>
  );
};
