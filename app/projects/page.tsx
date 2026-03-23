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
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Projects />
      </Suspense>
    </div>
  );
}
