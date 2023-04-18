import { Injectable } from '@nestjs/common';
import { CreatePetOwnerDto } from './dto/create-pet-owner.dto';
import { UpdatePetOwnerDto } from './dto/update-pet-owner.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PetOwnersService {
  constructor(private prisma: PrismaService) {}

  create(createPetOwnerDto: CreatePetOwnerDto) {
    return this.prisma.petOwner.create({
      data: { ...createPetOwnerDto, userId: 1 },
    });
  }

  findAll() {
    return this.prisma.petOwner.findMany();
  }

  findOne(id: number) {
    return this.prisma.petOwner.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updatePetOwnerDto: UpdatePetOwnerDto) {
    return this.prisma.petOwner.update({
      where: { id },
      data: updatePetOwnerDto,
    });
  }

  remove(id: number) {
    return this.prisma.petOwner.delete({
      where: { id },
    });
  }
}
