import { HeartIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mx-auto px-4 sm:px-6 lg:px-8 h-24 items-center justify-center text-center flex mt-auto">
      <p className="flex items-center gap-1">
        Made with{" "}
        <HeartIcon fill="currentColor" className="text-primary mx-1" />
        by <span className="text-primary">Lorenzo0111</span>
      </p>
    </footer>
  );
}
