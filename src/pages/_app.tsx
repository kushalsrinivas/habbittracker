import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ActivityProvider } from "@/context/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ActivityProvider>
      <Component {...pageProps} />;
    </ActivityProvider>
  );
}
