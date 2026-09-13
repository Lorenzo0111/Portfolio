import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";
import { Locale } from "./i18n";

function getPrisma() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

  return new PrismaClient({
    adapter,
  });
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
