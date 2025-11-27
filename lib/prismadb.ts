import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../generated/client";

function getPrisma() {
  return new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL!,
  }).$extends(withAccelerate());
}

declare global {
  var prisma: ReturnType<typeof getPrisma> | undefined;
}

const client = globalThis.prisma || getPrisma();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
