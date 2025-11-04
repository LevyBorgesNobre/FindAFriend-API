import { Org } from "@/generated/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "@/services/erros/org-already-exists-error";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
    email: string;
    password_hash: string;
    cep: string;
    address: string;
    phone_number: string;
}

interface RegisterUseCaseResponse {
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
    cep,
    address, 
    phone_number, 
  } : RegisterUseCaseRequest): Promise<RegisterUseCaseResponse>{
    
    const passwordHash = await hash(password_hash, 6)

    const orgWhithSameEmail = await this.orgsRepostory.findByEmail(email)

    if (orgWhithSameEmail){
        throw new OrgAlreadyExistsError()
    }

    const org  = await this.orgsRepostory.create({
        email,
        password_hash: passwordHash,
        cep,
        address,
        phone_number,
    })

    return{
        org
    }
} 
   
}