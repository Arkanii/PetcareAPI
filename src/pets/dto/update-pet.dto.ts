import { IsBoolean, IsDate, IsOptional } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import CreatePetDto from './create-pet.dto';

export default class UpdatePetDto extends PartialType(CreatePetDto) {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsBoolean()
  deceased: boolean | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDate()
  deceaseDate: Date | null;
}
