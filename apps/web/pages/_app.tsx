import "../styles/globals.css";
import "../styles/fonts.css";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import Router from "next/router";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import ProgressBar from "@badrap/bar-of-progress";
import { store } from "../store/store";
import { withUrqlClient } from "next-urql";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { RootLayout } from "@layouts/RootLayout";
import { createUrqlClient } from "@utils/createUrqlClient";
import Pusher from "pusher-js";
import { PusherContainer } from "@components/PusherContainer";

interface NoopProps extends React.FC {
  children: React.ReactNode;
}

type TMeta = {
  title?: string;
  metaTitle?: string;
  description?: string;
  metaDescription?: string;
};

export type TLayout = {
  children: ReactNode;
};

type LayoutProps = {
  Layout?: ({ children }: TLayout) => JSX.Element;
  meta?: TMeta;
};

export type NextPageWithLayout = NextPage & {
  layoutProps?: LayoutProps;
};

export type AppPropsWithLayout = AppProps & {
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

const pusher = new Pusher("4aa7a9d626b176d0e11f", {
  cluster: "us2",
  // use jwts in prod
  authEndpoint: `http://localhost:4000/pusher/auth`,
});

function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppPropsWithLayout) {
  const [navIsOpen, setNavIsOpen] = React.useState(false);
  // const [sessi];

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

  const Layout = Component.layoutProps?.Layout || RootLayout;
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps }
    : {};
  const meta = Component.layoutProps?.meta || {};
  const description =
    meta.metaDescription || meta.description || "Website for Chatting.";

  const presenceChannel = pusher.subscribe("presence-awesome");

  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{ key: "mantine", prepend: false }}
      >
        <Provider store={store}>
          <PusherContainer>
            <NotificationsProvider position="top-center">
              <Layout {...layoutProps}>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </PusherContainer>
        </Provider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(App);
