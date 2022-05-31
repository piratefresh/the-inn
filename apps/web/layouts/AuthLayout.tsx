import React from "react";
import layoutStyles from "./AuthLayout.module.css";

export interface ILayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC = ({ children }: ILayoutProps) => {
  return (
    <div className={`${layoutStyles.mainLayout}`}>
      <div>
        <img
          className="h-screen"
          src="https://www.dndbeyond.com/content/images/authentication/sidebar-appstore-today.jpg"
        />
      </div>
      <main className="relative">{children}</main>
    </div>
  );
};
