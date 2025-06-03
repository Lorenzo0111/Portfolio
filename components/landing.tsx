import Image from "next/image";
import iconImage from "@/public/icon.webp";

export default function Landing() {
  return (
    <div className="text-center m-auto flex flex-col justify-center items-center content-center h-[500px] md:w-3/4 xl:w-1/2">
      <div className="flex flex-col md:flex-row w-full">
        <div>
          <h1 className="text-3xl md:text-7xl mt-10 font-bold font-sans md:w-96 h-fit">
            Hello, I&apos;m <span className="text-gradient">Lorenzo</span>
          </h1>
          <p className="text-xl text-gray-400 w-3/4 md:w-full m-auto">
            I&apos;m a fullstack developer from Italy
          </p>
        </div>

        <div className="mt-5 md:mt-0 mr-auto md:mr-0 ml-auto w-3/4 lg:w-1/3">
          <Image
            className="h-auto w-full"
            src={iconImage}
            alt="Lorenzo"
            sizes="100vw"
            priority
          />
        </div>
      </div>
      <a href="#about" className="text-slate-300 text-xl mt-14 animate-bounce">
        <span className="mr-1 text-primary">↓</span> Learn more
      </a>
    </div>
  );
}
