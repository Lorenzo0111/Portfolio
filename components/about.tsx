import Image from "next/image";

export default function About() {
  return (
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

      <div className="md:ml-auto w-1/2">
        <h1 className="from-[#e3a002] to-[#fcc203] text-4xl mt-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r font-sans">
          About Me
        </h1>
        <p className="mt-2 text-md md:text-xl leading-8 md:text-left">
          Hello! I&apos;m Lorenzo. I&apos;m a java, web and bot developer from
          Italy who loves to code and create amazing new things every day.
        </p>
        <p className="mt-1 text-md md:text-xl leading-8 md:text-left">
          I can code in many languages, but I&apos;m most experienced in
          TypeScript and Java.
        </p>
        <p className="mt-1 text-md md:text-xl leading-8 md:text-left">
          I&apos;m currently working on a lot of projects, but I&apos;m always
          looking for new opportunities.
        </p>
      </div>
    </div>
  );
}
