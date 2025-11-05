import { Pet } from "@/generated/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "@/services/erros/resource-not-found";

interface CreatePetUseCaseRequest {
    orgId: string;
    name: string;
    size: string;
    age: string;
}

interface CreatePetUseCaseResponse {
    pet: Pet;
}

export class CreatePetUseCase {
    constructor(
    private petsRepository: PetsRepository,
    private orgRepository: OrgsRepository
    ){}

    async execute({
        orgId,
        name, 
        size,
        age
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse>{
        const org = await this.orgRepository.findById(orgId)

        if(!org){
            throw new ResourceNotFoundError()
        }

        const pet = await this.petsRepository.create({
            name,
            size,
            age,
            org_id: orgId
        })

        return {
            pet
        }
    }
}