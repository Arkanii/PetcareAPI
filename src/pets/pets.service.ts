import { PrismaService } from 'nestjs-prisma';

import { Injectable } from '@nestjs/common';

import CreatePetDto from './dto/create-pet.dto';
import UpdatePetDto from './dto/update-pet.dto';

@Injectable()
export default class PetsService {
  constructor(private prisma: PrismaService) {}

  create(createPetDto: CreatePetDto) {
    return this.prisma.pet.create({
      data: { ...createPetDto, petOwnerId: 1 },
    });
  }

  findAll() {
    return this.prisma.pet.findMany();
  }

  findOne(id: number) {
    return this.prisma.pet.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return this.prisma.pet.update({
      where: { id },
      data: updatePetDto,
    });
  }

  remove(id: number) {
    return this.prisma.pet.delete({
      where: { id },
    });
  }
}
