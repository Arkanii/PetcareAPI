import { ApiProperty } from '@nestjs/swagger';

export default class AuthEntity {
  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expireAt: Date;
}
