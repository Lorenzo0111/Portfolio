import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProjectPage() {
  const router = useRouter();
  const id = router.query.id;
  const { data: project } = useSWR(`/api/projects/${id}`, fetcher);

  return (
    <main>
      <div className="text-left mt-20 m-auto flex flex-col gap-4 h-[500px] md:w-3/4 xl:w-1/2">
        {project && project.error && <p>{project.error}</p>}
        {project && !project.error && (
          <>
            <h1 className="font-bold text-4xl">{project.name}</h1>
            <p className="text-gray-400">{project.description}</p>
            {project.link && (
              <div className="flex w-full gap-4">
                <Link
                  href={project.link}
                  className="bg-primary text-black rounded-xl h-10 w-full flex items-center justify-center"
                >
                  Visit Page
                </Link>
              </div>
            )}
            {project.images.length > 0 && (
              <h1 className="font-bold text-2xl">Images</h1>
            )}
            <Carousel autoPlay={true} showArrows={true} showIndicators={false} showStatus={false}>
              <Image
                src={project.images[0]}
                alt="project image"
                key={"1"}
                width={300}
                height={300}
              />
              {project.images.map((image: string) => {
                return (
                  <Image
                    src={image}
                    alt="project image"
                    key={image + "1"}
                    width={300}
                    height={300}
                  />
                );
              })}
            </Carousel>
          </>
        )}
      </div>
    </main>
  );
}
