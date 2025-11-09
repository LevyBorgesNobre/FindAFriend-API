import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory-repository/in-memory-pets-repository";
import { SearchNameUseCase } from "../search-name";
import { randomUUID } from "crypto";

let petsRepository: InMemoryPetRepository
let sut: SearchNameUseCase

describe('Search Name Use Case', ()=>{
      beforeEach(()=>{
        petsRepository = new InMemoryPetRepository()
        sut = new SearchNameUseCase(petsRepository)
     })
     
     it("should be able to search pet", async()=>{
      const createPet = await petsRepository.create({
        name:'Rex',
        size:'large',
        age:'2,5 years',
        state:'RJ',
        city:'Rio de Janeiro',
        org_id: randomUUID()
       })

       const { pet } = await sut.execute({
        name:createPet.name
       })

          expect(pet).toEqual([expect.objectContaining({ name: 'Rex' })])
     })

})