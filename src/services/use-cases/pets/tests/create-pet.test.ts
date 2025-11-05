import { describe, beforeEach, it, expect } from "vitest";
import { CreatePetUseCase } from "../create-pet";
import { InMemoryPetRepository } from "@/repositories/in-memory-repository/in-memory-pets-repository";
import { InMemoryOrgRepository } from "@/repositories/in-memory-repository/in-memory-orgs-repository";
import { ResourceNotFoundError } from "@/services/erros/resource-not-found";

let orgRepository: InMemoryOrgRepository
let petsRepository: InMemoryPetRepository
let sut: CreatePetUseCase

describe("Create Pet Use Case", ()=>{
     beforeEach(()=>{
        orgRepository = new InMemoryOrgRepository()
        petsRepository = new InMemoryPetRepository()
        sut = new CreatePetUseCase(petsRepository, orgRepository)
     })

    it("should be able to create a pet", async()=>{
      const org  = await orgRepository.create({
        email: "johndoe@example.com",
        password_hash: "hassadasdahdaSenha123",
        cep:"dasdasd",
        address: "Rua Exemplo,123123 123",
        phone_number: "+55asdasd11999999999"
        })
       
       const { pet } = await sut.execute({
        orgId: org.id,
        name:"Rex",
        size: "medium",
        age: "2 years"
       })

       expect(pet.id).toEqual(expect.any(String))
    })

    it("should be able to create a pet with invalid org id", async()=>{
       const invalid_id = ''

        await expect(()=>
        sut.execute({
         orgId: invalid_id,
         name:"rex",
         size:"medium",
         age:"3"
        })
      ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})