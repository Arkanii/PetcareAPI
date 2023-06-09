import { PrismaService } from 'nestjs-prisma';

import { Injectable } from '@nestjs/common';

import PetOwnerEntity from '../pet-owners/entities/pet-owner.entity';
import CreatePetDto from './dto/create-pet.dto';
import UpdatePetDto from './dto/update-pet.dto';

@Injectable()
export default class PetsService {
  constructor(private prisma: PrismaService) {}

  create(createPetDto: CreatePetDto, petOwner: PetOwnerEntity) {
    return this.prisma.pet.create({
      data: { ...createPetDto, petOwnerId: petOwner.id },
    });
  }

  findAll(petOwner: PetOwnerEntity) {
    return this.prisma.pet.findMany({
      where: { petOwnerId: petOwner.id },
    });
  }

  findOne(id: number, petOwner: PetOwnerEntity) {
    return this.prisma.pet.findFirstOrThrow({
      where: { id, petOwnerId: petOwner.id },
    });
  }

  async update(
    id: number,
    updatePetDto: UpdatePetDto,
    petOwner: PetOwnerEntity,
  ) {
    const pet = await this.findOne(id, petOwner);

    return this.prisma.pet.update({
      where: { id: pet.id },
      data: updatePetDto,
    });
  }

  async remove(id: number, petOwner: PetOwnerEntity) {
    const pet = await this.findOne(id, petOwner);

    return this.prisma.pet.delete({
      where: { id: pet.id },
    });
  }
}
