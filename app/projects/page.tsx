import Projects from "@/components/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse all projects and work by Lorenzo0111",
};

export default function ProjectsPage() {
  return (
    <div>
      <Projects />
    </div>
  );
}
