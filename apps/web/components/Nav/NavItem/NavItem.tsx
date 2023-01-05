import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export type NavItemProps = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export const NavItemLink = ({ label, onClick, href = "" }: NavItemProps) => {
  const router = useRouter();

  const isSelected = React.useMemo(
    () => router?.asPath.startsWith(href),
    [router?.asPath, href]
  );

  const labelLowercase = React.useMemo(
    () => encodeURIComponent(label.toLowerCase()),
    [label]
  );

  return (
    <li
      className={`font-sans list-none mr-8 text-brandBlack dark:text-white ${
        isSelected ? "font-bold" : ""
      }`}
    >
      <Link href={href ? href : `/${labelLowercase}`}>
        <a className="bold text-lg" onClick={onClick}>
          {label}
        </a>
      </Link>
    </li>
  );
};

export const NavItemButton = ({ label, onClick, href = "" }: NavItemProps) => {
  const router = useRouter();

  const isSelected = React.useMemo(
    () => router?.asPath.startsWith(href),
    [router?.asPath, href]
  );

  const labelLowercase = React.useMemo(
    () => encodeURIComponent(label.toLowerCase()),
    [label]
  );

  return (
    <li
      className={`cursor-pointer font-sans list-none mr-8 text-brandBlack dark:text-white ${
        isSelected ? "font-bold" : ""
      }`}
    >
      <a className="bold text-lg" onClick={onClick}>
        {label}
      </a>
    </li>
  );
};
