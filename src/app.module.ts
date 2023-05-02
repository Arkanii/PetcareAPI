import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { PetOwnersModule } from './pet-owners/pet-owners.module';
import { PetsModule } from './pets/pets.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';

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
export class AppModule {}
