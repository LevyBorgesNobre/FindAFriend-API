import { describe, beforeEach, it, expect } from "vitest";
import { GetOrgProfileUseCase } from "../get-org-profile";
import { InMemoryOrgRepository } from "@/repositories/in-memory-repository/in-memory-orgs-repository";
import { ResourceNotFoundError } from "@/services/erros/resource-not-found";

let orgsRepository: InMemoryOrgRepository
let sut: GetOrgProfileUseCase

describe(('Get Org Profile Use Case'), ()=>{
    beforeEach(()=>{
       orgsRepository = new InMemoryOrgRepository()
       sut = new GetOrgProfileUseCase(orgsRepository)
    })

    it('should be able to get org profile', async()=>{
      const createOrg = await orgsRepository.create({
        email: "johndoe@example.com",
        password_hash: "hassadasdahdaSenha123",
        address: "Rua Exemplo,123123 123",
        phone_number: "+55asdasd11999999999",
        city: "Santa Catarina",
        State: "SC"
        })
        
        const { org } = await sut.execute({
            id: createOrg.id
        })

         expect(org.id).toEqual(expect.any(String))
    })

    it('should not be able to get org profile with wrong id', async()=>{
       orgsRepository.create({
        email: "johndoe@example.com",
        password_hash: "hassadasdahdaSenha123",
        address: "Rua Exemplo,123123 123",
        phone_number: "+55asdasd11999999999",
        city: "Santa Catarina",
        State: "SC"
        })

         expect(()=>
         sut.execute({
            id:"123"
         })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})