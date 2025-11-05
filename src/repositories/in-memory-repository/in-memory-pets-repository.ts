import { Pet } from "@/generated/client";
import { PetCreateInput, PetUncheckedCreateInput } from "@/generated/models";
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
            city:null,
            state:null,
            org_id: data.org_id
        }

        this.pets.push(pet)
        return pet

    }
}