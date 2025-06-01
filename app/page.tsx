import About from "@/components/about";
import Landing from "@/components/landing";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Lorenzo0111",
};

export default function Home() {
  return (
    <main>
      <Landing />
      <About />
      <Skills />
      <Projects embed />
    </main>
  );
}
