import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ActivityProvider } from "@/context/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ActivityProvider>
      <div className="flex justify-center p-10 m-5">
        <Link href={"/dashboard"}>
          <Button variant={"link"}>Dashboard</Button>
        </Link>
      </div>
      <Component {...pageProps} />;
    </ActivityProvider>
  );
}
