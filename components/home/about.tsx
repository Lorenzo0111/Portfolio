import { SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowRight, Code2, Layout, Terminal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { IconBox } from "../ui/icon-box";

export default function About() {
  return (
    <div
      id="about"
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24"
    >
      <Card className="md:col-span-2 lg:col-span-2 row-span-2">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <IconBox className="mb-6 text-primary">
            <Terminal className="w-6 h-6" />
          </IconBox>
          <h3 className="text-2xl font-bold mb-4">Software Developer</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            I love to create new experiences for people to enjoy. I mainly use
            Typescript and Java for my projects but I also know a lot of other
            technologies. I&apos;m always looking for new opportunities to learn
            and grow as a developer.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Java", "TypeScript", "React", "Next.js", "PHP", "Flutter"].map(
              (tech) => (
                <Badge key={tech}>{tech}</Badge>
              )
            )}
          </div>
        </div>
      </Card>

      <Card
        href="/projects"
        variant="primary"
        className="flex flex-col justify-between"
      >
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-black/10 rounded-full" />
        <div className="w-12 h-12 bg-black/10 rounded-2xl flex items-center justify-center mb-4 text-black">
          <Layout className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
            Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-black/70 text-sm">Check out my latest work</p>
        </div>
      </Card>

      <Card className="flex flex-col justify-between">
        <IconBox className="mb-4 text-blue-400">
          <Code2 className="w-6 h-6" />
        </IconBox>
        <div>
          <div className="text-4xl font-bold text-white mb-1">5+</div>
          <div className="text-sm text-gray-400">Years of Experience</div>
        </div>
      </Card>

      <Card
        href="https://github.com/Lorenzo0111"
        target="_blank"
        variant="github"
        className="md:col-span-2 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full">
            <SiGithub className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">GitHub</h3>
            <p className="text-gray-400">Explore my open source projects</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </Card>
    </div>
  );
}
