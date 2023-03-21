import Navbar from "@/components/navbar";
import Project, { ProjectType } from "@/components/project";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: projects } = useSWR("/api/projects", fetcher);

  return (
    <main>
      <Navbar />

      <div className="text-center m-auto flex flex-col justify-center items-center content-center h-[500px] md:w-3/4 xl:w-1/2">
        <div className="flex flex-col md:flex-row w-full">
          <div>
            <h1
              className="text-3xl md:text-7xl mt-10 font-bold font-sans w-96 h-fit"
              data-aos="fade-down"
            >
              Hello, I'm{" "}
              <span className="from-[#f1a900] to-[#fdeb77] text-transparent bg-clip-text bg-gradient-to-r">
                Lorenzo
              </span>
            </h1>
            <p
              className="text-xl text-gray-400"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              I'm a java, web and bot developer from Italy
            </p>
          </div>

          <Image
            className="mt-5 md:mt-0 mr-auto md:mr-0 ml-auto"
            src="/icon.png"
            alt="Lorenzo"
            width={300}
            height={300}
            data-aos="zoom-in"
            data-aos-duration="1000"
          />
        </div>
        <a
          href="#about"
          className="text-slate-300 text-xl mt-14 animate-bounce"
          data-aos="flip-up"
          data-aos-duration="1000"
        >
          <span className="mr-1 text-primary">↓</span> Learn more
        </a>
      </div>

      <div
        id="about"
        className="mt-[20px] flex flex-col md:flex-row gap-x-5 content-center justify-center items-center text-center m-auto md:w-3/4"
      >
        <Image
          className="mt-5 md:mt-0 mr-auto md:mr-0 ml-auto"
          src="/meditation.svg"
          alt="meditation"
          width={300}
          height={300}
          data-aos="zoom-in"
          data-aos-duration="1000"
        />

        <div className="ml-auto w-1/2">
          <h1 className="from-[#e3a002] to-[#fcc203] text-4xl mt-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r font-sans">
            About Me
          </h1>
          <p className="mt-2 text-md md:text-xl leading-8 md:text-left">
            Hello! I'm Lorenzo. I'm a java, web and bot developer from Italy who
            loves to code and create amazing new things every day.
          </p>
          <p className="mt-1 text-md md:text-xl leading-8 md:text-left">
            I can code in many languages, but I'm most experienced in TypeScript
            and Java.
          </p>
          <p className="mt-1 text-md md:text-xl leading-8 md:text-left">
            I'm currently working on a lot of projects, but I'm always looking
            for new opportunities.
          </p>
        </div>
      </div>

      <div
        id="projects"
        className="my-20 flex gap-8 flex-wrap w-full content-center justify-center items-center text-center"
      >
        {projects &&
          projects.map((project: ProjectType) => {
            return <Project key={project.id} project={project} />;
          })}
      </div>
    </main>
  );
}
