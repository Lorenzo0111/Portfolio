"use client";

import type { EventTypes } from "@/lib/plausible";
import { usePlausible } from "next-plausible";
import Link from "next/link";

export default function ProjectsBanner() {
  const plausible = usePlausible<EventTypes>();

  return (
    <div
      id="projects"
      className="mx-auto my-20 text-center w-3/4 justify-center"
    >
      <div className="bg-card rounded-xl p-20 flex flex-col gap-4 text-center justify-center items-center">
        <h1 className="text-3xl font-extrabold text-gradient">
          Learn more about what I did
        </h1>
        <Link
          onClick={() =>
            plausible("banner-click", { props: { banner: "projects" } })
          }
          href="/projects"
          className="w-fit bg-primary text-black p-2 px-4 rounded-xl"
        >
          See my projects
        </Link>
      </div>
    </div>
  );
}
