import type { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function Project({
  project,
  embed,
}: {
  project: Project;
  embed?: boolean;
}) {
  return (
    <Link
      href={"/projects/" + project.id}
      className={
        "border-primary rounded-xl border-2 h-60 w-[400px] min-w-[400px] block relative hover:shadow-lg hover:shadow-primary/30" +
        (embed ? " mr-8" : "")
      }
    >
      {!project.thumbnail && <span className="mt-6 loader"></span>}
      {project.thumbnail && (
        <>
          <Image
            src={project.thumbnail}
            alt={project.name}
            width={400}
            height={240}
            className="rounded-xl h-full w-full"
            placeholder="blur"
            blurDataURL="LD71s6}j^I-m~V^G==-m^$=r-P%0"
          />
        </>
      )}
      <div className="rounded-b-xl flex flex-col bg-black/70 w-full max-h-[6rem] p-4 bottom-0 absolute justify-center items-center">
        <h1 className="font-extrabold text-ellipsis w-full text-2xl overflow-hidden whitespace-nowrap">
          {project.name}
        </h1>
        <p className="text-ellipsis w-full text-gray-400 overflow-hidden whitespace-nowrap">
          {project.category}
        </p>
      </div>
    </Link>
  );
}
