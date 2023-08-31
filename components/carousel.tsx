"use client";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function WrappedCarousel({ project }: { project: any }) {
  return (
    <Carousel
      autoPlay={true}
      showArrows={true}
      showIndicators={false}
      showStatus={false}
    >
      {project.images.map((image: string) => {
        return image.endsWith(".mp4") ? (
          <video
            preload="none"
            autoPlay={true}
            controls={false}
            loop={true}
            muted={true}
          >
            <source src={image} type="video/mp4" />
          </video>
        ) : (
          <Image src={image} alt={project.name} width={300} height={300} />
        );
      })}
    </Carousel>
  );
}
