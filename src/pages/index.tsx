import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between  `}
    >
      <div className="text-3xl font-black">Build Yourself</div>
      <div className="text-3xl font-black">One Habbit At A time</div>
      <div className="flex flex-col gap-5 lg:w-1/3 m-auto w-full">
        <Link className="w-full " href={"/dashboard"}>
          <Button className="w-full">Dashboard</Button>
        </Link>
      </div>
    </main>
  );
}
