import { NextPage } from "next";
import { WithUrqlProps } from "next-urql";
import type { AppProps } from "next/app";

export type TMeta = {
  title?: string;
  metaTitle?: string;
  description?: string;
  metaDescription?: string;
  sideImage?: string;
};

export type TLayout = {
  children: React.ReactNode;
};

export type LayoutProps = {
  Layout?: ({ children }: TLayout) => JSX.Element;
  meta?: TMeta;
};

export type NextPageWithLayout = NextPage & {
  layoutProps?: LayoutProps;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  resetUrqlClient: WithUrqlProps["resetUrqlClient"];
};
