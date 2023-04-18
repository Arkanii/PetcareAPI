import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { PetOwnersModule } from './pet-owners/pet-owners.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [PrismaModule.forRoot(), UsersModule, PetOwnersModule, PetsModule],
})
export class AppModule {}
