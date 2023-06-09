import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import RolesGuard from './roles.guard';
import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService],
})
export default class UsersModule {}
