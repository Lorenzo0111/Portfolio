"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useRef, useState } from "react";

export default function Skill({
  children,
  skills,
}: {
  children: ReactNode;
  skills: Record<string, number>;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  const toggleSlider = (open: boolean) => {
    setOpen(open);

    const content = contentRef.current;
    const chevron = chevronRef.current;
    if (!content || !chevron) return;

    if (open) {
      content.style.height = content.scrollHeight + "px";
      chevron.style.transform = "rotate(180deg)";
    } else {
      content.style.height = "0px";
      chevron.style.transform = "rotate(0deg)";
    }
  };

  return (
    <div className="w-full md:w-[30rem] 2xl:w-[20rem] flex flex-col gap-2" data-aos="fade-right">
      <button
        className="bg-[#232323] rounded-xl w-full min-h-[3rem] px-4 flex justify-between items-center"
        onClick={() => toggleSlider(!open)}
      >
        <span>{children}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="transition-all"
          ref={chevronRef}
        />
      </button>
      <div
        ref={contentRef}
        className="transition-all ease-in-out duration-200 overflow-hidden bg-[#232323] rounded-xl"
        style={{ height: "0px" }}
      >
        <div className="flex flex-col gap-2 p-4">
          {Object.entries(skills).map(([skill, level]) => (
            <div className="py-2" key={skill}>
              <div className="flex justify-between items-center">
                <span>{skill}</span>
                <span>{level}%</span>
              </div>
              <div className="bg-[#2f2f2f] my-2 rounded-xl h-1 w-full">
                <div
                  className="bg-primary rounded-xl h-full transition-all ease-in delay-100 duration-200"
                  style={{ width: open ? `${level}%` : "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
