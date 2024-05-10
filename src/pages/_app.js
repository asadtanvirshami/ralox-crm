import React, { useState } from "react";
import Router, { useRouter } from "next/router";
//****React-Query****
import { QueryClient, QueryClientProvider } from "react-query";
//****StyleSheet****
import "@/styles/globals.css";
//****Components****
import { Toaster } from "@/components/ui/toaster";
import Loader from "@/components/Shared/Loader";
import Layout from "@/components/Shared/Layout";
import { Provider as JotaiProvider } from "jotai";

export default function App({ Component, pageProps: { ...pageProps } }) {
  const [loading, setLoading] = useState(false);
  const [defaultLayout, setDefaultLayout] = useState([10, 10, 10, 10]);
  const [defaultCollapsed, setDefaultCollapsed] = useState(true);
  const router = useRouter();
  const queryClient = new QueryClient();

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));

  return (
    <>
      {router.pathname !== "/auth" &&
        router.pathname !== "/" &&
        router.pathname !== "/reset" && (
          <>
            {loading ? (
              <Layout
                defaultLayout={defaultLayout}
                setDefaultLayout={setDefaultLayout}
                defaultCollapsed={defaultCollapsed}
                setDefaultCollapsed={setDefaultCollapsed}
              >
                <Loader />
              </Layout>
            ) : (
              <JotaiProvider>
                <QueryClientProvider client={queryClient}>
                  <Layout
                    defaultLayout={defaultLayout}
                    defaultCollapsed={defaultCollapsed}
                  >
                    <Component {...pageProps} />
                    <Toaster />
                  </Layout>
                </QueryClientProvider>
              </JotaiProvider>
            )}
          </>
        )}
      {(router.pathname === "/" ||
        router.pathname === "/auth" ||
        router.pathname === "/reset") && (
        <JotaiProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <Toaster />
          </QueryClientProvider>
        </JotaiProvider>
      )}
    </>
  );
}
