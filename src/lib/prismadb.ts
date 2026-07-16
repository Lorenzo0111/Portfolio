import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../generated/client";
import { Locale } from "./i18n";

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

declare global {
  namespace PrismaJson {
    type Translations = {
      [key in Locale]?: string;
    };
  }
}

export default client;
