import Image from "next/image";

export default function Landing() {
  return (
    <div className="text-center m-auto flex flex-col justify-center items-center content-center h-[500px] md:w-3/4 xl:w-1/2">
      <div className="flex flex-col md:flex-row w-full">
        <div>
          <h1
            className="text-3xl md:text-7xl mt-10 font-bold font-sans md:w-96 h-fit"
            data-aos="fade-down"
          >
            Hello, I&apos;m <span className="text-gradient">Lorenzo</span>
          </h1>
          <p
            className="text-xl text-gray-400 w-3/4 md:w-full m-auto"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            I&apos;m a java, web and bot developer from Italy
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
  );
}
