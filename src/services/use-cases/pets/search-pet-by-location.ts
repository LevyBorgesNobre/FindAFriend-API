import { Pet } from "@/generated/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "@/services/erros/resource-not-found";
import { th } from "zod/v4/locales";

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
       
       if(pet[0].state.toLocaleLowerCase() !== state.toLocaleLowerCase()){
         throw new ResourceNotFoundError()
       }

       return {
        pet
       }
    }
}