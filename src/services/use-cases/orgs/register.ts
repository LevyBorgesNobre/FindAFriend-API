import { Org } from "@/generated/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "@/services/erros/org-already-exists-error";
import { hash } from "bcryptjs";

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
    address, 
    phone_number, 
    city, 
    State} : OrgUseCaseRequest): Promise<OrgUseCaseResponse>{
    
    const passwordHash = await hash(password_hash, 6)

    const orgWhithSameEmail = await this.orgsRepostory.findByEmail(email)

    if (orgWhithSameEmail){
        throw new OrgAlreadyExistsError()
    }

    const org  = await this.orgsRepostory.create({
        email,
        password_hash: passwordHash,
        address,
        phone_number,
        city,
        State
    })

    return{
        org
    }
} 
   
}