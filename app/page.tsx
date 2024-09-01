import Skills from "@/components/skills";
import About from "@/components/about";
import Landing from "@/components/landing";
import ProjectsBanner from "@/components/projects-banner";
import Projects from "@/components/projects";

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
