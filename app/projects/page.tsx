import Projects from "@/components/projects";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse all projects and work by Lorenzo0111",
};

export default function ProjectsPage() {
  return (
    <div>
      <Suspense fallback={<span className="mt-6 loader"></span>}>
        <Projects />
      </Suspense>
    </div>
  );
}
