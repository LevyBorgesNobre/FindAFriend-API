import { Pet } from "@/generated/client";
import { PetUncheckedCreateInput } from "@/generated/models";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetsRepository{
    private pets: Pet[] = []

    async create(data: PetUncheckedCreateInput) {
       
        const pet: Pet = {
            id: randomUUID(),
            name: data.name,
            size: data.size,
            age: data.age,
            city:data.city,
            state:data.state,
            org_id: data.org_id
        }

        this.pets.push(pet)
        return pet

    }


   async findByName(data: string): Promise<Pet[]> {
        return this.pets.filter((pet)=> pet.name.includes(data))
    }

    async findByLocation(state: string, city: string): Promise<Pet[]> {
        const petLocation = 
        this.pets.filter((pet)=> pet.state?.includes(state)) &&
        this.pets.filter((pet)=> pet.city?.includes(city))
        
        return petLocation
    }
}