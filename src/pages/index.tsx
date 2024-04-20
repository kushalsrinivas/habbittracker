import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <Link href={"/dashboard"}>
          <Button variant={"ghost"}>Dashboard</Button>
        </Link>
      </div>
      <div className="font-black text-3xl text-center">
        {" "}
        You Cant Grow Unless You Arent Tracking it
      </div>
      <div className="flex flex-col gap-5 w-full">
        <Link className="w-full " href={"/why"}>
          <Button className="w-full">Sign up</Button>
        </Link>
        <Link className="w-full " href={"/why"}>
          <Button className="w-full">Sign In</Button>
        </Link>
      </div>
    </main>
  );
}
