import { PrismaPetRepositoy } from "@/repositories/prisma/prisma-pet-repository"
import { SearchPetByLocationUseCase } from "../use-cases/pets/search-pet-by-location"

export function makeGetPetLocationUseCase(){
      const petsRepository = new PrismaPetRepositoy()
      const searchByLocationUseCase = new SearchPetByLocationUseCase(petsRepository)
      
      return searchByLocationUseCase
}