import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

function getPrisma() {
  return new PrismaClient().$extends(withAccelerate());
}

declare global {
  var prisma: ReturnType<typeof getPrisma> | undefined;
}

const client = globalThis.prisma || getPrisma();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
