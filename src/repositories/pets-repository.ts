import { Pet, Prisma } from "@/generated/client"

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findByName(data: string): Promise<Pet[]>
}