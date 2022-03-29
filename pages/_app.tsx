import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { initClient } from "../utils/client";

const queryClient = new QueryClient();

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState("");
  const router = useRouter();

  const gqlClient = initClient(token);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    console.log(storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <Component
          {...pageProps}
          gqlClient={gqlClient}
          setToken={setToken}
          key={router.route}
        />
      </AnimatePresence>
      <style>
        {`
        body {
          padding: 0;
          margin: 0;
          background: #f9fbf8;
        }

        * {
          box-sizing: border-box;
          font-family: Helvetica, sans-serif;
          font-weight: 900;
          color: #222;
        }
      `}
      </style>
    </QueryClientProvider>
  );
}

export default MyApp;
