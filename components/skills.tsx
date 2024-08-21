import {
  SiFigma,
  SiHtml5,
  SiOpenjdk,
  SiUbuntu,
} from "@icons-pack/react-simple-icons";
import Skill from "./skill";

export default function Skills() {
  return (
    <div id="skills" className="mx-auto my-20 text-center w-3/4 justify-center">
      <h1 className="font-extrabold my-4 text-gradient text-3xl">Skills</h1>

      <div className="flex flex-wrap gap-4 justify-center 2xl:justify-between">
        <Skill skills={{ Spigot: 100, Paper: 75, NMS: 65 }}>
          <SiOpenjdk className="mr-2" /> Plugin Developer
        </Skill>
        <Skill skills={{ "HTML & CSS": 100, ReactJS: 90, VueJS: 75 }}>
          <SiHtml5 className="mr-2" /> Web Developer
        </Skill>
        <Skill skills={{ Ubuntu: 85, Windows: 70 }}>
          <SiUbuntu className="mr-2" /> System Administrator
        </Skill>
        <Skill skills={{ UIX: 85, "Logo Design": 75 }}>
          <SiFigma className="mr-2" /> Designer
        </Skill>
      </div>
    </div>
  );
}
