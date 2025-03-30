import { SiDiscord, SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ClerkButton = dynamic(() => import("./clerk"));

export default function Navbar() {
  return (
    <nav className="mx-auto px-4 sm:px-6 lg:px-8 h-24 items-center flex w-full">
      <div className="flex flex-col space-x-4 md:flex-row items-center justify-center md:justify-start content-center w-full relative">
        <div className="w-full flex justify-between md:justify-start gap-4">
          <Link className="hover:text-primary" href="/#home">
            Home
          </Link>
          <Link className="hover:text-primary" href="/#about">
            About
          </Link>
          <Link className="hover:text-primary" href="/#skills">
            Skills
          </Link>
          <Link className="hover:text-primary" href="/projects">
            Projects
          </Link>
        </div>

        <div className="flex items-center md:absolute right-0 gap-4">
          <Link
            className="hover:text-primary"
            href="mailto:hello@lorenzo0111.me"
            aria-label="Email"
          >
            <Mail width={48} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://discord.gg/HT47UQXBqG"
            aria-label="Discord"
          >
            <SiDiscord width={48} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://github.com/Lorenzo0111"
            aria-label="GitHub"
          >
            <SiGithub width={48} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://x.com/akaLorenzo0111"
            aria-label="X (Twitter)"
          >
            <SiX width={48} />
          </Link>
          <ClerkButton />
        </div>
      </div>
    </nav>
  );
}
