import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  faDiscord,
  faGithub,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

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
            href="https://discord.gg/HT47UQXBqG"
            aria-label="Discord"
          >
            <FontAwesomeIcon width={48} icon={faDiscord} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://github.com/Lorenzo0111"
            aria-label="GitHub"
          >
            <FontAwesomeIcon width={48} icon={faGithub} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://x.com/akaLorenzo0111"
            aria-label="X (Twitter)"
          >
            <FontAwesomeIcon width={48} icon={faXTwitter} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://www.youtube.com/@lorenzo0111"
            aria-label="YouTube"
          >
            <FontAwesomeIcon width={48} icon={faYoutube} />
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
