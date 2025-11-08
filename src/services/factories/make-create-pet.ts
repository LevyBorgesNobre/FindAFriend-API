import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { PrismaPetRepositoy } from "@/repositories/prisma/prisma-pet-repository";
import { CreatePetUseCase } from "../use-cases/pets/create-pet";

export function makeCreatePet(){
    const orgsRepository = new PrismaOrgRepository()
    const petsRepository = new PrismaPetRepositoy()
    const createPetUseCase = new CreatePetUseCase(petsRepository, orgsRepository)
    
    return createPetUseCase
}