import {
  Box,
  ChevronsLeftRightEllipsis,
  Database,
  HardDrive,
  Paintbrush,
  Smartphone
} from "lucide-react";
import Skill from "./skill";

export default function Skills() {
  return (
    <div id="skills" className="mx-auto my-20 text-center w-3/4 justify-center">
      <h1 className="font-extrabold my-4 text-gradient text-3xl">Skills</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        <Skill skills={{ Spigot: 100, Paper: 75, NMS: 65 }}>
          <Box className="mr-2" /> Plugin Development
        </Skill>
        <Skill skills={{ "Node.js": 90, "React / Next.js": 90, Vue: 75 }}>
          <ChevronsLeftRightEllipsis className="mr-2" /> Fullstack Development
        </Skill>
        <Skill skills={{ Docker: 90, Debian: 85 }}>
          <HardDrive className="mr-2" /> System Administration
        </Skill>
        <Skill skills={{ UIX: 85, "Logo Design": 75 }}>
          <Paintbrush className="mr-2" /> Design
        </Skill>
        <Skill skills={{ Capacitor: 90, "React Native": 75 }}>
          <Smartphone className="mr-2" /> Mobile Development
        </Skill>
        <Skill skills={{ MySQL: 85, MongoDB: 75, Postgres: 75 }}>
          <Database className="mr-2" /> Databases
        </Skill>
      </div>
    </div>
  );
}
