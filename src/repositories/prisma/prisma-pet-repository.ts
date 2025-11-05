import { Pet } from "@/generated/client";
import { PetCreateInput, PetUncheckedCreateInput } from "@/generated/models";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma"

export class PrismaPetRepositoy implements PetsRepository {
  async create(data: PetUncheckedCreateInput): Promise<Pet> {
          const pet = await prisma.pet.create({
                data,
            })
            return pet
    }
}