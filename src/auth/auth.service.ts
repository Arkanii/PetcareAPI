import * as bcrypt from 'bcrypt';
import ms, { StringValue } from 'ms';
import { PrismaService } from 'nestjs-prisma';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import CreateUserDto from '../users/dto/create-user.dto';
import UsersService from '../users/users.service';
import AuthEntity from './entities/auth.entity';

@Injectable()
export default class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      expireAt: new Date(
        Date.now() +
          ms(this.configService.get<StringValue>('jwt.expiration_time')),
      ),
      accessToken: this.generateAccessToken(user.id),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthEntity> {
    const user = await this.userService.create(createUserDto);

    return {
      expireAt: new Date(
        Date.now() +
          ms(this.configService.get<StringValue>('jwt.expiration_time')),
      ),
      accessToken: this.generateAccessToken(user.id),
    };
  }

  private generateAccessToken(userId: number): string {
    return this.jwtService.sign({ userId });
  }
}
