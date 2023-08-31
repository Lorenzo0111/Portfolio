import type { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function Project({ project }: { project: Project }) {
  return (
    <Link
      href={"/projects/" + project.id}
      className="border-primary rounded-xl border-2 h-60 w-60 relative hover:shadow-lg hover:shadow-primary/30"
    >
      {!project.images[0] && <span className="mt-6 loader"></span>}
      {project.images[0] && (
        <>
          {project.images[0].endsWith(".mp4") ? (
            <video
              preload="none"
              className="rounded-xl"
              autoPlay={true}
              controls={false}
              loop={true}
              muted={true}
            >
              <source src={project.images[0]} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={project.images[0]}
              alt={project.name}
              width={500}
              height={500}
              className="rounded-xl h-full"
            />
          )}
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
