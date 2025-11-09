import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@/generated/client";
import { ResourceNotFoundError } from "@/services/erros/resource-not-found";

interface SearchNameUseCaseRequest {
   name:string
}

interface SearchNameUseCaseResponse {
 pet: Pet[]
}
export class SearchNameUseCase{
    constructor(
     private petsRepository:PetsRepository
    ){}
    
    async execute({
    name
    }: SearchNameUseCaseRequest): Promise<SearchNameUseCaseResponse>{

        const pet = await this.petsRepository.findByName(name)

        if (pet[0].name.toLocaleLowerCase() !== name.toLocaleLowerCase()){
            throw new ResourceNotFoundError()
        }

        return {
            pet
        }
    }
    
}