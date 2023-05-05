import { ApiProperty } from '@nestjs/swagger';

export default class AuthEntity {
  @ApiProperty()
  accessToken: string;
}
