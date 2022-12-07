import React from "react";
import { LayoutProps } from "Types/LayoutPage";
import layoutStyles from "./AuthLayout.module.css";

export interface ILayoutProps {
  children: React.ReactNode;
  layoutProps: LayoutProps;
}

export const AuthLayout: React.FC = ({
  children,
  layoutProps,
}: ILayoutProps) => {
  return (
    <div className={`${layoutStyles.mainLayout}`}>
      <div>
        <img className="h-screen" src={layoutProps.meta.sideImage} />
      </div>
      <main className="relative">{children}</main>
    </div>
  );
};
