import Skills from "@/components/skills";
import About from "@/components/about";
import Landing from "@/components/landing";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <main>
      <Landing />
      <About />
      <Skills />
      <Projects />
    </main>
  );
}
