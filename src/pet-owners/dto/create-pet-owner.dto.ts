import {
  IsISO31661Alpha3,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export default class CreatePetOwnerDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  gender: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  firstName: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  lastName: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  address: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  zipCode: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  city: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @IsISO31661Alpha3()
  country: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  phone: string | null;
}
