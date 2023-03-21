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
    <nav className="mx-auto px-4 sm:px-6 lg:px-8 h-24 items-center flex">
      <div className="flex space-x-4 flex-row items-center justify-center md:justify-start content-center w-full relative">
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

        <div className="absolute right-0 space-x-4">
          <Link
            className="hover:text-primary"
            href="https://rocketcreations.net/discord"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://github.net/Lorenzo0111"
          >
            <FontAwesomeIcon icon={faGithub} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://twitter.com/akaLorenzo0111"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link
            className="hover:text-primary"
            href="https://www.youtube.com/@lorenzo0111"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
