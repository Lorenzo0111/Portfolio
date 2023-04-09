import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skill from "./skill";
import {
  faFigma,
  faHtml5,
  faJava,
  faUbuntu,
} from "@fortawesome/free-brands-svg-icons";

export default function Skills() {
  return (
    <div id="skills" className="my-20 w-3/4 mx-auto justify-center text-center">
      <h1 className="text-3xl font-extrabold my-4 text-gradient">Skills</h1>

      <div className="flex flex-wrap gap-4 justify-between">
        <Skill skills={{ Spigot: 100, Paper: 75, NMS: 60 }}>
          <FontAwesomeIcon icon={faJava} className="mr-2" /> Plugin Developer
        </Skill>
        <Skill skills={{ "HTML & CSS": 100, VueJS: 75, ReactJS: 60 }}>
          <FontAwesomeIcon icon={faHtml5} className="mr-2" /> Web Developer
        </Skill>
        <Skill skills={{ "Ubuntu": 90, "Windows": 80 }}>
          <FontAwesomeIcon icon={faUbuntu} className="mr-2" /> System
          Administrator
        </Skill>
        <Skill skills={{ "UIX": 100, "Logo Design": 85 }}>
          <FontAwesomeIcon icon={faFigma} className="mr-2" /> Designer
        </Skill>
      </div>
    </div>
  );
}
