"use client";

import type { Project } from "@prisma/client";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMemo } from "react";

export default function WrappedCarousel({ project }: { project: Project }) {
  const items = useMemo(() => {
    const items = project.images.map((image: string) => {
      return image.endsWith(".mp4") ? (
        <video
          preload="none"
          autoPlay={true}
          controls={false}
          loop={true}
          muted={true}
          key={image}
          className="w-[400px] h-[400px] object-contain"
        >
          <source src={image} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={image}
          alt={project.name}
          width={400}
          height={400}
          placeholder="empty"
          className="w-[400px] h-[400px] object-contain"
          key={image}
        />
      );
    });

    if (project.youtube)
      items.push(
        <iframe
          key="youtube"
          src={`https://www.youtube-nocookie.com/embed/${project.youtube}`}
          allowFullScreen
          width={400}
          height={400}
          className="w-[400px] h-[400px] object-contain"
        />
      );

    return items;
  }, [project]);

  if (items.length === 0) {
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
      {items}
    </Carousel>
  );
}
