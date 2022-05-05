import "../styles/globals.css";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import Router from "next/router";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import ProgressBar from "@badrap/bar-of-progress";
import { store } from "../store/store";
import { withUrqlClient } from "next-urql";
import { NextComponentType, NextPage, NextPageContext } from "next";
import { SessionProvider } from "next-auth/react";

interface NoopProps extends React.FC {
  children: React.ReactNode;
}

type LayoutProps = {
  Layout: ReactElement;
};

type NextPageWithLayout = NextPage & {
  layoutProps?: LayoutProps;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Noop = ({ children }: NoopProps) => <>{children}</>;

const progress = new ProgressBar({
  size: 2,
  color: "#38bdf8",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", () => progress.start());
Router.events.on("routeChangeComplete", () => progress.finish());
Router.events.on("routeChangeError", () => progress.finish());

function App({ Component, pageProps }: AppPropsWithLayout) {
  const [navIsOpen, setNavIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!navIsOpen) return;
    function handleRouteChange() {
      setNavIsOpen(false);
    }
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [navIsOpen]);

  const Layout = Component.layoutProps?.Layout || React.Fragment;
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : {};

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionOptions={{ key: "mantine", prepend: false }}
    >
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Layout {...layoutProps}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    </MantineProvider>
  );
}

export default withUrqlClient(
  () => ({
    url: "https://localhost:4000/graphql",
  }),
  { ssr: false }
)(App);
