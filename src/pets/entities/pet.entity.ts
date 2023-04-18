import { Pet, PetGender, IdentificationType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PetEntity implements Pet {
  constructor(partial: Partial<PetEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty({ required: false, nullable: true })
  specie: string | null;

  @ApiProperty({ required: false, nullable: true })
  gender: PetGender | null;

  @ApiProperty({ required: false, nullable: true })
  name: string | null;

  @ApiProperty({ required: false, nullable: true })
  breed: string | null;

  @ApiProperty({ required: false, nullable: true })
  coat: string | null;

  @ApiProperty({ required: false, nullable: true })
  birthCountry: string | null;

  @ApiProperty({ required: false, nullable: true })
  birthDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  deceased: boolean | null;

  @ApiProperty({ required: false, nullable: true })
  deceaseDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  picture: string | null;

  @ApiProperty({ required: false, nullable: true })
  identificationType: IdentificationType | null;

  @ApiProperty({ required: false, nullable: true })
  identificationDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  identificationPlace: string | null;

  @ApiProperty({ required: false, nullable: true })
  identificationNumber: string | null;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  petOwnerId: number;
}
