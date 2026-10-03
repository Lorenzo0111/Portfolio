import prisma from "@/lib/prismadb";
import { normalizeName } from "@/lib/utils";
import { unstable_cache } from "next/cache";

function decodeId(id: string) {
  try {
    return decodeURIComponent(id);
  } catch {
    return id;
  }
}

export function findProject(rawId: string) {
  const id = decodeId(rawId);
  const normalizedId = normalizeName(id);

  return prisma.project.findFirst({
    where: {
      OR: [
        { id: normalizedId },
        { name: { equals: normalizedId, mode: "insensitive" } },
        { name: { equals: id, mode: "insensitive" } },
      ],
    },
  });
}

export const getCachedProject = (id: string) =>
  unstable_cache(() => findProject(id), ["project", id], {
    revalidate: 3600,
    tags: [`project_${id}`],
  })();
