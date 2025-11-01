import { describe } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory-repository/in-memory-orgs-repository";
import { AuthenticateUseCase } from "../authenticate";
import { beforeEach, it, expect } from "vitest";
import { hashSync } from "bcryptjs";
import { OrgInvalidCredentialsError } from "@/services/erros/org-invalid-credentials-error";

let orgsRepository: InMemoryOrgRepository
let sut:  AuthenticateUseCase

describe("Authenticate Use Case",()=>{
     beforeEach(()=>{
       orgsRepository = new InMemoryOrgRepository()
       sut = new AuthenticateUseCase(orgsRepository)
    })

    it('should be able to authenticate', async()=>{
       
        await orgsRepository.create({
        email: "johndoe@example.com",
        password_hash: String(hashSync('hassadasdahdaSenha123', 6)),
        address: "Rua Exemplo,123123 123",
        phone_number: "+55asdasd11999999999",
        city: "Santa Catarina",
        State: "SC"
        })
       
        const { org } = await sut.execute({
        email: "johndoe@example.com",
        password_hash: "hassadasdahdaSenha123",
       })

       expect(org.id).toEqual(expect.any(String))
    })

      it('should not be able to authenticate with wrong email', async()=>{
         await orgsRepository.create({
        email: "johndoe@example.com",
        password_hash: String(hashSync('hassadasdahdaSenha123', 6)),
        address: "Rua Exemplo,123123 123",
        phone_number: "+55asdasd11999999999",
        city: "Santa Catarina",
        State: "SC"
        })

         await expect(() => 
           sut.execute({
           email: "johndoe@example33.com",
           password_hash: "hassadasdahdaSenha123",
          }),
         ).rejects.toBeInstanceOf(OrgInvalidCredentialsError)
    })

       it('should not be able to authenticate with wrong password', async()=>{
        await orgsRepository.create({
        email: "johndoe@example.com",
        password_hash: String(hashSync('123456', 6)),
        address: "Rua Exemplo,123123 123",
        phone_number: "+55asdasd11999999999",
        city: "Santa Catarina",
        State: "SC"
        })

         await expect(() =>
           sut.execute({
           email: "johndoe@example.com",
           password_hash: "1234",
          }),
         ).rejects.toBeInstanceOf(OrgInvalidCredentialsError)
    })
    
} )