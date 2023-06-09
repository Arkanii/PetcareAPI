import { IdentificationType, PetGender } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export default class CreatePetDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  specie: string | null;

  @ApiProperty({ required: false, nullable: true, enum: PetGender })
  @IsOptional()
  @IsString()
  @IsEnum(PetGender)
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
  @IsDateString()
  birthDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  picture: string | null;

  @ApiProperty({ required: false, nullable: true, enum: IdentificationType })
  @IsOptional()
  @IsEnum(IdentificationType)
  identificationType: IdentificationType | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
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
