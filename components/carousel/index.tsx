"use client";

import type { Project } from "@/generated/client";
import { ZoomInIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type CarouselItemType = { src: string; type: "image" | "video" | "youtube" };

function CarouselItem({
  item,
  name,
  videoRef,
  preview = false,
}: {
  item: CarouselItemType;
  name: string;
  preview?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}) {
  return item.type === "video" ? (
    <video
      preload={preview ? "metadata" : "auto"}
      autoPlay={!preview}
      controls={false}
      loop={true}
      muted={true}
      playsInline={true}
      className="w-full h-full object-cover rounded-xl"
      ref={videoRef}
    >
      <source src={item.src} type="video/mp4" />
    </video>
  ) : item.type === "image" ? (
    <Image
      src={item.src}
      alt={name}
      width={preview ? 200 : 400}
      height={preview ? 100 : 400}
      placeholder="empty"
      className="w-full h-full max-h-[400px] object-cover rounded-xl"
    />
  ) : preview ? (
    <Image
      src={`https://img.youtube.com/vi/${item.src}/0.jpg`}
      alt={name}
      width={200}
      height={100}
      placeholder="empty"
      className="w-full h-full object-cover rounded-xl"
    />
  ) : (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${item.src}`}
      allowFullScreen
      className={
        "w-full h-full object-contain rounded-xl " +
        (!preview ? "min-h-[400px]" : "")
      }
    />
  );
}

export default function Carousel({ project }: { project: Project }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const items = useMemo(() => {
    const items: CarouselItemType[] = project.images.map((item) => ({
      src: item,
      type: item.endsWith(".mp4") ? "video" : "image",
    }));

    if (project.youtube)
      items.push({
        src: project.youtube,
        type: "youtube",
      });

    return items;
  }, [project.images, project.youtube]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play();
        }
      } catch {}
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  if (items.length === 0) return <div></div>;

  return (
    <div className="flex flex-row w-full gap-4">
      <div className="h-full w-1/4 max-h-[400px] overflow-y-auto pr-2 flex flex-col gap-4">
        {items.map((item, index) => (
          <button
            key={item.src}
            onClick={() => setCurrentIndex(index)}
            className={
              "w-full h-[100px] object-cover rounded-xl border-primary hover:border transition-all " +
              (currentIndex === index ? "border" : "")
            }
          >
            <CarouselItem item={item} name={project.name} preview />
          </button>
        ))}
      </div>
      <div className="h-full w-3/4 flex flex-col gap-4">
        <button
          className="relative w-full h-full max-h-[400px] object-contain rounded-xl cursor-pointer group"
          onClick={() => {
            if (items[currentIndex].type !== "image") return;
            setExpanded(true);
          }}
        >
          {items[currentIndex].type === "image" && (
            <div className="hover:bg-black/50 transition-all absolute inset-0 size-full z-10 flex justify-center items-center">
              <ZoomInIcon className="size-14 hidden group-hover:block" />
            </div>
          )}

          <CarouselItem
            item={items[currentIndex]}
            name={project.name}
            videoRef={videoRef}
          />
        </button>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 md:p-0"
          onClick={() => setExpanded(false)}
        >
          <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full h-full object-contain rounded-xl flex justify-center items-center">
              <Image
                src={items[currentIndex].src}
                alt={project.name}
                width={400}
                height={400}
                placeholder="empty"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
