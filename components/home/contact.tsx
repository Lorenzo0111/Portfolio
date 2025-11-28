import { Mail } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <div
      id="contact"
      className="mt-20 p-12 rounded-3xl bg-linear-to-r from-primary/20 to-purple-500/20 border border-white/10 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-card/40 backdrop-blur-sm -z-10" />
      <h3 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to start a project?
      </h3>
      <p className="text-gray-300 mb-8 max-w-xl mx-auto">
        I&apos;m ready to hear your ideas and help you bring them to life. Get
        in touch with me today and let&apos;s create something amazing together!
      </p>
      <Link
        href="mailto:contact@lorenzo0111.me"
        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-colors"
      >
        Let&apos;s Talk <Mail className="w-5 h-5" />
      </Link>
    </div>
  );
}
