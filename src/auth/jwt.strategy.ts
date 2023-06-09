import { PrismaService } from 'nestjs-prisma';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.prisma.user.findUnique({
      include: { petOwner: true },
      where: { id: payload.userId },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
