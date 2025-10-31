import { Org } from "@/generated/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgInvalidCredentialsError } from "@/services/erros/org-invalid-credentials-error";
import { compare } from "bcryptjs";

interface OrgUseCaseRequest {
    email: string;
    password_hash: string;
    address: string;
    phone_number: string;
    city: string;
    State: string
}

interface OrgUseCaseResponse {
    org: Org
}

export class RegisterUseCase{

constructor(
   private orgsRepostory: OrgsRepository
){

}

async execute({
    email, 
    password_hash, 
    } : OrgUseCaseRequest): Promise<OrgUseCaseResponse>{
    

    const org = await this.orgsRepostory.findByEmail(email)

    if (!org){
        throw new OrgInvalidCredentialsError()
    }

    const doesPasswordHash = await compare(password_hash, org.password_hash)

    if (!doesPasswordHash){
        throw new OrgInvalidCredentialsError()
    }
    
    return{
        org
    }
} 
   
}