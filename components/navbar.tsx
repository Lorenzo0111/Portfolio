import {
  faDiscord,
  faGithub,
  faTwitter,
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
          <Link className="hover:text-primary" href="/#projects">
            Projects
          </Link>
          <Link className="hover:text-primary" href="/#works">
            Works
          </Link>
          <Link className="hover:text-primary" href="/#experience">
            Experience
          </Link>
        </div>

        <div className=" md:absolute right-0 space-x-4">
          <Link
            className="hover:text-primary"
            href="https://rocketcreations.net/discord"
            aria-label="Discord"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://github.net/Lorenzo0111"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://twitter.com/akaLorenzo0111"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://www.youtube.com/@lorenzo0111"
            aria-label="YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
