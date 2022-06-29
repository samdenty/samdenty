import "../styles/globals.css";
import { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { TRACKING_ID } from "./_document";
import { BackgroundEffect } from "../src/components/BackgroundEffect";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  const handleRouteChange = (url: string) => {
    (window as any).gtag("config", TRACKING_ID, {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <BackgroundEffect />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
