"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AnimationLoader() {
  useEffect(() => {
    AOS.init();
  });

  return <div></div>;
}
