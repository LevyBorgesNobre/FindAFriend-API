import { describe, it, beforeEach, expect } from "vitest";
import { GetLocationCoordinatesUseCase } from "../get-location-coordinates";
import { TestOpenCageLocationServices } from "@/services/external-services/OpenCage/tests/test-open-cage-location-service";
import { ResourceNotFoundError } from "@/services/erros/resource-not-found";

    let locationService: TestOpenCageLocationServices
    let sut: GetLocationCoordinatesUseCase

 describe('Get Location Coordinates Use Case', ()=>{
     beforeEach(()=>{
        locationService = new TestOpenCageLocationServices()
        sut = new GetLocationCoordinatesUseCase(locationService)
     })

     it("should be able to get coordinates", async()=>{

      const getLocationPet = await sut.execute({
          latitude: 123123123,
          longitude: 4122523525,
        })

      expect(getLocationPet).toMatchObject({
        state: expect.any(String),
        city: expect.any(String),
       })
     })

    it("should not be able to get with wrong coordinates", async()=>{
  
          await expect(()=>
                sut.execute({
                latitude: undefined as any,
                longitude: undefined as any,
                })
              ).rejects.toBeInstanceOf(ResourceNotFoundError)
     })

})