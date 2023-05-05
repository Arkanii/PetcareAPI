import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';

import { Injectable } from '@nestjs/common';

import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        petOwner: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      include: {
        petOwner: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: UpdateUserDto = updateUserDto;

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: user,
      include: {
        petOwner: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      include: {
        petOwner: true,
      },
    });
  }
}
