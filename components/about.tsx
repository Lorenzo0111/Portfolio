import Image from "next/image";
import aboutImage from "@/public/about.svg";

export default function About() {
  return (
    <div
      id="about"
      className="mt-[20px] flex flex-col md:flex-row gap-x-5 content-center justify-center items-center text-center m-auto md:w-3/4"
    >
      <Image
        className="mt-40 md:mt-auto mr-auto md:mr-0 ml-auto h-[300px] w-[300px]"
        src={aboutImage}
        alt="about"
        width={300}
        height={300}
      />

      <div className="md:ml-auto w-1/2">
        <h1 className="from-[#e3a002] to-[#fcc203] text-4xl mt-10 font-extrabold text-transparent bg-clip-text bg-linear-to-r font-sans">
          About Me
        </h1>
        <p className="mt-2 text-md md:text-xl leading-8 md:text-left">
          Hello! I&apos;m Lorenzo. I&apos;m a software developer from Italy. I
          love to create new experiences for people to enjoy.
        </p>
        <p className="mt-1 text-md md:text-xl leading-8 md:text-left">
          I mainly use Typescript and Java for my projects but I also know a lot
          of other technologies.
        </p>
        <p className="mt-1 text-md md:text-xl leading-8 md:text-left">
          I&apos;m always looking for new opportunities to learn and grow as a
          developer.
        </p>
      </div>
    </div>
  );
}
