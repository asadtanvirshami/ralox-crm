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

export default function App({ Component, pageProps: { ...pageProps } }) {
  const [loading, setLoading] = useState(false);
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
              <Layout>
                <Loader />
              </Layout>
            ) : (
              <QueryClientProvider client={queryClient}>
                <Layout>
                  <Component {...pageProps} />
                  <Toaster />
                </Layout>
              </QueryClientProvider>
            )}
          </>
        )}
      {(router.pathname === "/" ||
        router.pathname === "/auth" ||
        router.pathname === "/reset") && (
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster />
        </QueryClientProvider>
      )}
    </>
  );
}
