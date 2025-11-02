import { Org } from "@/generated/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { ResourceNotFoundError } from "@/services/erros/resource-not-found";

interface GetOrgProfileUseCaseRequest {
    id: string
}

interface GetOrgProfileUseCaseResponse {
    org: Org
}

export class GetOrgProfileUseCase{

constructor(
   private orgsRepostory: OrgsRepository
){

}

async execute({
    id
    } : GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse>{
    

    const org = await this.orgsRepostory.findById(id)

    if (!org){
        throw new ResourceNotFoundError()
    }
    
    return{
        org
    }
} 
   
}