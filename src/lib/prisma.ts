import { PrismaClient } from "../generated/client";
import { env } from "@/env/index"

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : []
});