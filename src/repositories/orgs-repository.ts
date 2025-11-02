import { Org, Prisma } from "@/generated/client";

export interface OrgsRepository {
    findById(id: string): Promise<Org | null>
    create(data: Prisma.OrgCreateInput): Promise<Org>
    findByEmail(email: string): Promise<Org | null>
}