"use client";

import type { Project } from "@prisma/client";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMemo } from "react";

export default function WrappedCarousel({ project }: { project: Project }) {
  const memoizedProject = useMemo(() => project, [project]);

  if (memoizedProject.images.length === 0) {
    return <div></div>;
  }

  return (
    <Carousel
      autoPlay={true}
      showArrows={true}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
    >
      {memoizedProject.images.map((image: string) => {
        return image.endsWith(".mp4") ? (
          <video
            preload="none"
            autoPlay={true}
            controls={false}
            loop={true}
            muted={true}
            key={image}
          >
            <source src={image} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={image}
            alt={memoizedProject.name}
            width={500}
            height={500}
            placeholder="empty"
            key={image}
          />
        );
      })}
    </Carousel>
  );
}
