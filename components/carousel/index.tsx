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
      className="w-full h-full rounded-xl object-contain bg-black"
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
      className="w-full h-full max-h-[400px] rounded-xl object-contain bg-black"
      draggable={false}
    />
  ) : preview ? (
    <Image
      src={`https://img.youtube.com/vi/${item.src}/0.jpg`}
      alt={name}
      width={200}
      height={100}
      placeholder="empty"
      className="w-full h-full object-contain rounded-xl"
      draggable={false}
    />
  ) : (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${item.src}`}
      allowFullScreen
      className={
        "w-full h-full object-contain rounded-xl bg-black " +
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
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div className="w-full md:w-1/4 max-h-[140px] md:max-h-[400px] overflow-x-auto overflow-y-hidden md:overflow-y-auto md:overflow-x-hidden md:pr-2 flex flex-row md:flex-col gap-3 md:gap-4 pb-1 md:pb-0">
        {items.map((item, index) => (
          <button
            key={item.src}
            onClick={() => setCurrentIndex(index)}
            className={
              "shrink-0 w-[150px] md:w-full h-[96px] md:h-[104px] rounded-xl border border-transparent bg-black/40 p-1 hover:border-primary/60 transition-all " +
              (currentIndex === index ? "border" : "")
            }
          >
            <div className="h-full w-full rounded-lg bg-black/40">
              <CarouselItem item={item} name={project.name} preview />
            </div>
          </button>
        ))}
      </div>
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        <button
          className="relative w-full h-[280px] md:h-full max-h-[400px] rounded-xl cursor-pointer group bg-black/60 border border-white/10 overflow-hidden"
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
