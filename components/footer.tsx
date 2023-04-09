import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto px-4 sm:px-6 lg:px-8 h-24 items-center justify-center text-center flex mt-auto">
      <p>
        Made with <FontAwesomeIcon icon={faHeart} className="text-primary" /> by{" "}
        <Link href="/" className="text-primary hover:underline">
          Lorenzo0111
        </Link>
      </p>
    </footer>
  );
}
