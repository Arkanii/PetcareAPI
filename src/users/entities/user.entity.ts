import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import PetOwnerEntity from '../../pet-owners/entities/pet-owner.entity';

export default class UserEntity implements User {
  constructor({ petOwner, ...data }: Partial<UserEntity>) {
    Object.assign(this, data);
    if (petOwner) {
      this.petOwner = new PetOwnerEntity(petOwner);
    }
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  petOwnerId: number | null;

  @ApiProperty({ required: false, type: PetOwnerEntity })
  petOwner?: PetOwnerEntity;
}
