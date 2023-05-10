import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import CreateUserDto from '../users/dto/create-user.dto';
import UserEntity from '../users/entities/user.entity';
import UsersService from '../users/users.service';
import AuthService from './auth.service';
import LoginDto from './dto/login.dto';
import AuthEntity from './entities/auth.entity';
import { Public } from './public.decorator';

@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() { email, password }: LoginDto) {
    return new AuthEntity(await this.authService.login(email, password));
  }

  @Public()
  @Post('register')
  @ApiOkResponse({ type: AuthEntity })
  async register(@Body() createUserDto: CreateUserDto) {
    return new AuthEntity(await this.authService.register(createUserDto));
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getMe(@Request() req) {
    return new UserEntity(await this.userService.findOne(req.user.id));
  }
}
