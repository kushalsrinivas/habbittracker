import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
 
      <div className="font-black lg:text-4xl text-3xl w-full lg:w-1/2 m-10 text-center">
        You&apos;ll never change your life until you change the habits you do
        daily.
      </div>
      <div className="flex flex-col gap-5 lg:w-1/3 m-auto w-full">
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
