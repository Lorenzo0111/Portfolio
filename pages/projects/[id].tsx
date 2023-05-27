import Link from "next/link";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useFetcher } from "@/utils/fetcher";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProjectPage() {
  const router = useRouter();
  const id = router.query.id;
  const { data: project } = useFetcher(`/api/projects/${id}`);

  return (
    <main>
      <div className="flex flex-col m-auto h-[500px] mt-20 text-left gap-4 md:w-3/4 xl:w-1/2">
        {project && project.error && <p>{project.error}</p>}
        {project && !project.error && (
          <>
            <h1 className="font-bold text-4xl">{project.name}</h1>
            <p className="text-gray-400">{project.description}</p>
            {project.link && (
              <div className="flex w-full gap-4">
                <Link
                  href={project.link}
                  className="bg-primary rounded-xl flex h-10 text-black w-full items-center justify-center"
                >
                  Visit Page
                </Link>
              </div>
            )}
            {project.images.length > 0 && (
              <h1 className="font-bold text-2xl">Images</h1>
            )}
            <Carousel
              autoPlay={true}
              showArrows={true}
              showIndicators={false}
              showStatus={false}
            >
              {project.images.map((image: { name: string; url: string }) => {
                return image.name.endsWith(".mp4") ? (
                  <video
                    preload="none"
                    autoPlay={true}
                    controls={false}
                    loop={true}
                    muted={true}
                  >
                    <source src={image.url} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={image.url}
                    alt={project.name}
                    width={300}
                    height={300}
                  />
                );
              })}
            </Carousel>
          </>
        )}
        {!project && <span className="mx-auto mt-6 loader"></span>}
      </div>
    </main>
  );
}
