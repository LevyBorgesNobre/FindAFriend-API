import { Pet } from "@/generated/client";
import { PetsRepository } from "@/repositories/pets-repository";

interface SearchPetByLocationUseCaseRequest{
    state: string;
    city: string;
}

interface SearchPetByLocationUseCaseResponse{
    pet: Pet[]
}

export class SearchPetByLocationUseCase{
    constructor(
        private petsRepository: PetsRepository
    ){}
    
    async execute({
     state,
     city
    }: SearchPetByLocationUseCaseRequest): Promise<SearchPetByLocationUseCaseResponse>{
       const pet = await this.petsRepository.findByLocation(state, city)
       
     if (!pet || pet.length === 0) {
       throw new Error(`There are no pets registered for the location:${state}, ${city}`);
    }

       return {
        pet
       }
    }
}