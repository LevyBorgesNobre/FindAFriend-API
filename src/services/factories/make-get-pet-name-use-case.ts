import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { PrismaPetRepositoy } from "@/repositories/prisma/prisma-pet-repository";
import { SearchNameUseCase } from "../use-cases/pets/search-name";

export function makeGetPetNameUseCase(){
    const petsRepository = new PrismaPetRepositoy()
    const searchNameUseCase = new SearchNameUseCase(petsRepository)
    
    return searchNameUseCase
}