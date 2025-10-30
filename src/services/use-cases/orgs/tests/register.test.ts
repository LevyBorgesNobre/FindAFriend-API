import { InMemoryOrgRepository } from "@/repositories/in-memory-repository/in-memory-orgs-repository";
import { RegisterUseCase } from "../register";
import { beforeEach, describe, it, expect } from "vitest";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "@/services/erros/org-already-exists-error";

let orgsRepository: InMemoryOrgRepository
let sut:  RegisterUseCase

 describe("Register Use Case", ()=>{
    beforeEach(()=>{
       orgsRepository = new InMemoryOrgRepository()
       sut = new RegisterUseCase(orgsRepository)
    })

    it('should be able to register a new org', async()=>{
       const { org } = await sut.execute({
        email: "johndoe@example.com",
        password_hash: "hassadasdahdaSenha123",
        address: "Rua Exemplo,123123 123",
        phone_number: "+55asdasd11999999999",
        city: "Santa Catarina",
        State: "SC"
       })

       expect(org.id).toEqual(expect.any(String))
    })
    
    it('should hash user password upon registration', async()=>{
     const { org }  = await sut.execute({
        email: "johndoe@example.com",
        password_hash: "hassadasdahdaSenha123",
        address: "Rua Exemplo,123123 123",
        phone_number: "+55asdasd11999999999",
        city: "Santa Catarina",
        State: "SC"
      })

        const isPasswordCorrectlyHashed = await compare(
        "hassadasdahdaSenha123",
        org.password_hash
    )
      expect(isPasswordCorrectlyHashed).toBe(true)

    })
     
    it('should not be able to register with same email twice', async()=>{
        await sut.execute({
        email: "johndoe@example.com",
        password_hash: "hassadasdahdaSenha123",
        address: "Rua Exemplo,123123 123",
        phone_number: "+55asdasd11999999999",
        city: "Santa Catarina",
        State: "SC"
       })

        await expect(() => 
          sut.execute({
            email: "johndoe@example.com",
            password_hash: "hassadasdahdaSenha123",
            address: "Rua Exemplo,123123 123",
            phone_number: "+55asdasd11999999999",
            city: "Santa Catarina",
            State: "SC"
          }),
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })
  
 })