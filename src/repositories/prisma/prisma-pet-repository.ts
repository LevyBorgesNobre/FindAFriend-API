import { Pet } from "@/generated/client";
import { PetUncheckedCreateInput } from "@/generated/models";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma"

export class PrismaPetRepositoy implements PetsRepository {
  async create(data: PetUncheckedCreateInput): Promise<Pet> {
          const pet = await prisma.pet.create({
                data,
            })
            return pet
    }

  async findByName(data: string): Promise<Pet[]> {
      const pet = await prisma.pet.findMany({
        where:{
         name:{
          contains:data,
          mode: "insensitive"
         }
        }
      })

      return pet
    }

}