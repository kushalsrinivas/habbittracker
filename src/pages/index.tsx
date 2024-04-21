import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const list = [
    <>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          You&#39;ll never change your life until you change the habits you do
          daily.
        </p>
        &mdash; Wealth Director (@wealth_director){" "}
        <a href="https://twitter.com/wealth_director/status/1781692311031746578?ref_src=twsrc%5Etfw">
          April 20, 2024
        </a>
      </blockquote>{" "}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </>,
    <>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          &quot;All benefits in life come from compound interest, whether in
          money, relationships, love, health, activities, or habits.&quot;
          <a href="https://twitter.com/naval?ref_src=twsrc%5Etfw">@naval</a>
        </p>
        &mdash; Navalism (@NavalismHQ){" "}
        <a href="https://twitter.com/NavalismHQ/status/1781687262620860651?ref_src=twsrc%5Etfw">
          April 20, 2024
        </a>
      </blockquote>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </>,
    <>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          I&#39;m just rebuilding my life. Unlearning old toxic habits and
          relearning new good healthy ones.
        </p>
        &mdash; Moral Philosophy (@ML_Philosophy){" "}
        <a href="https://twitter.com/ML_Philosophy/status/1781612565182730473?ref_src=twsrc%5Etfw">
          April 20, 2024
        </a>
      </blockquote>{" "}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
    </>,
  ];
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between  `}
    >
      <div>{list[Math.floor(Math.random() * list.length)]}</div>
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
