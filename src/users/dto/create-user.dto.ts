import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({ minNumbers: 0 })
  @IsString()
  password: string;
}
