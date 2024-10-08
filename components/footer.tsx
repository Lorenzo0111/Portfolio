import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto px-4 sm:px-6 lg:px-8 h-24 items-center justify-center text-center flex mt-auto">
      <p className="flex items-center gap-1">
        Made with <Heart className="text-primary mx-1" /> by{" "}
        <Link href="/" className="text-primary underline">
          Lorenzo0111
        </Link>
      </p>
    </footer>
  );
}
