import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory-repository/in-memory-pets-repository";
import { randomUUID } from "crypto";
import { SearchPetByLocationUseCase } from "../search-pet-by-location";

let petsRepository: InMemoryPetRepository
let sut: SearchPetByLocationUseCase

describe('Search Name Use Case', ()=>{
      beforeEach(()=>{
        petsRepository = new InMemoryPetRepository()
        sut = new SearchPetByLocationUseCase(petsRepository)
     })
     
     it("should be able to search pet by location", async()=>{
  
      const createPet = await petsRepository.create({
            name:'Rex',
            size:'large',
            age:'2,5 years',
            state:'RJ',
            city:'Rio de Janeiro',
            org_id: randomUUID()
           })
    
           const { pet } = await sut.execute({
            state: createPet.state,
            city: createPet.city
           })
    
              expect(pet).toEqual([expect.objectContaining({ state: 'RJ', city: 'Rio de Janeiro'})])
     })

})