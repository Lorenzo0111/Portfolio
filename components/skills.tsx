import {
  Box,
  ChevronsLeftRightEllipsis,
  HardDrive,
  Paintbrush,
} from "lucide-react";
import Skill from "./skill";

export default function Skills() {
  return (
    <div id="skills" className="mx-auto my-20 text-center w-3/4 justify-center">
      <h1 className="font-extrabold my-4 text-gradient text-3xl">Skills</h1>

      <div className="flex flex-wrap gap-4 justify-center 2xl:justify-between">
        <Skill skills={{ Spigot: 100, Paper: 75, NMS: 65 }}>
          <Box className="mr-2" /> Plugin Developer
        </Skill>
        <Skill skills={{ "Node.js": 90, React: 90, Vue: 75 }}>
          <ChevronsLeftRightEllipsis className="mr-2" /> Fullstack Developer
        </Skill>
        <Skill skills={{ Ubuntu: 85, Windows: 70 }}>
          <HardDrive className="mr-2" /> System Administrator
        </Skill>
        <Skill skills={{ UIX: 85, "Logo Design": 75 }}>
          <Paintbrush className="mr-2" /> Designer
        </Skill>
      </div>
    </div>
  );
}
