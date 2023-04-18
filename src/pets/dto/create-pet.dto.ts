import { ApiProperty } from '@nestjs/swagger';
import { IdentificationType, PetGender } from '@prisma/client';
import { IsBoolean, IsDate, IsIn, IsString, IsUrl } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ required: false, nullable: true })
  @IsString()
  specie: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsIn(Object.keys(PetGender))
  gender: PetGender | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  name: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  breed: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  coat: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  birthCountry: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsDate()
  birthDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  @IsBoolean()
  deceased: boolean | null;

  @ApiProperty({ required: false, nullable: true })
  @IsDate()
  deceaseDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  @IsUrl()
  picture: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsIn(Object.keys(IdentificationType))
  identificationType: IdentificationType | null;

  @ApiProperty({ required: false, nullable: true })
  @IsDate()
  identificationDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  identificationPlace: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  identificationNumber: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  description: string | null;
}
