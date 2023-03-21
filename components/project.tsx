import Image from "next/image";
import Link from "next/link";

export type ProjectType = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  images: string[];
  cover: string;
};

export default function Project({ project }: { project: ProjectType }) {
  return (
    <Link
      href={"/projects/" + project.id}
      className="border-2 rounded-xl border-primary w-60 h-60 relative hover:shadow-primary/30 hover:shadow-lg"
    >
      <Image
        src={project.cover}
        alt={project.name}
        width={500}
        height={500}
        className="rounded-xl h-full"
      />
      <div className="absolute max-h-[5rem] bottom-0 w-full flex flex-col justify-center items-center p-4 bg-black/70 rounded-b-xl">
        <h1 className="font-extrabold text-2xl">{project.name}</h1>
        <p className="text-gray-400">{project.category}</p>
      </div>
    </Link>
  );
}
