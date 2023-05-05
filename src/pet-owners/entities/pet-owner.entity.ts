import { PetOwner } from '@prisma/client';
import { Exclude } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export default class PetOwnerEntity implements PetOwner {
  constructor(partial: Partial<PetOwnerEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty({ required: false, nullable: true })
  gender: string | null;

  @ApiProperty({ required: false, nullable: true })
  firstName: string | null;

  @ApiProperty({ required: false, nullable: true })
  lastName: string | null;

  @ApiProperty({ required: false, nullable: true })
  address: string | null;

  @ApiProperty({ required: false, nullable: true })
  zipCode: string | null;

  @ApiProperty({ required: false, nullable: true })
  city: string | null;

  @ApiProperty({ required: false, nullable: true })
  country: string | null;

  @ApiProperty({ required: false, nullable: true })
  phone: string | null;

  @Exclude()
  userId: number;
}
