import { ApiProperty } from '@nestjs/swagger';
import { IsISO31661Alpha3, IsPhoneNumber, IsString } from 'class-validator';

export class CreatePetOwnerDto {
  @ApiProperty({ required: false, nullable: true })
  @IsString()
  gender: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  firstName: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  lastName: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  address: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  zipCode: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  city: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsISO31661Alpha3()
  country: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsPhoneNumber()
  phone: string | null;
}
