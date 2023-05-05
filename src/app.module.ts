import { PrismaModule } from 'nestjs-prisma';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import AuthModule from './auth/auth.module';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import PetOwnersModule from './pet-owners/pet-owners.module';
import PetsModule from './pets/pets.module';
import UsersModule from './users/users.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [appConfig, jwtConfig],
      isGlobal: true,
      expandVariables: true,
    }),
    AuthModule,
    PetOwnersModule,
    PetsModule,
    UsersModule,
  ],
})
export default class AppModule {}
