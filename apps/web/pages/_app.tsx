import "../styles/globals.css";
import "../styles/fonts.css";
import React from "react";
import { Provider } from "react-redux";
import Router from "next/router";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import ProgressBar from "@badrap/bar-of-progress";
import { store } from "../store/store";
import { withUrqlClient } from "next-urql";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import { SSRProvider } from "@react-aria/ssr";
import { createUrqlClient } from "@utils/createUrqlClient";
import { configureAbly } from "@ably-labs/react-hooks";
import { AppPropsWithLayout } from "Types/LayoutPage";
import { UserPageLayout } from "@layouts/UserPageLayout";

configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/createTokenRequest`,
});

const progress = new ProgressBar({
  size: 2,
  color: "#38bdf8",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", () => progress.start());
Router.events.on("routeChangeComplete", () => progress.finish());
Router.events.on("routeChangeError", () => progress.finish());

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

  const Layout = Component.layoutProps?.Layout || UserPageLayout;
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps }
    : {};
  const meta = Component.layoutProps?.meta || {};
  const description =
    meta.metaDescription || meta.description || "Website for Chatting.";

  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <MantineProvider withGlobalStyles withNormalizeCSS key="mantine">
            <QueryParamProvider adapter={NextAdapter}>
              <Provider store={store}>
                <NotificationsProvider position="top-center">
                  <Layout {...layoutProps}>
                    <Component {...pageProps} />
                  </Layout>
                </NotificationsProvider>
              </Provider>
            </QueryParamProvider>
          </MantineProvider>
        </ThemeProvider>
      </SessionProvider>
    </SSRProvider>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(App);
