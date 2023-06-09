import { IdentificationType, PetGender } from '@prisma/client';
import { IsDate, IsIn, IsOptional, IsString, IsUrl } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export default class CreatePetDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  specie: string | null;

  @ApiProperty({ required: false, nullable: true, enum: PetGender })
  @IsOptional()
  @IsString()
  @IsIn(Object.keys(PetGender))
  gender: PetGender | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  name: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  breed: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  coat: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  birthCountry: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDate()
  birthDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUrl()
  picture: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsIn(Object.keys(IdentificationType))
  identificationType: IdentificationType | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDate()
  identificationDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  identificationPlace: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  identificationNumber: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  description: string | null;
}
