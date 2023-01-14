import * as prismaBackend from "backend";

declare global {
  var prisma: prismaBackend.PrismaClient | undefined;
}

export const prisma = global.prisma || new prismaBackend.PrismaClient();

if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") global.prisma = prisma;
