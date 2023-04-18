import { Module } from '@nestjs/common';
import { PetOwnersService } from './pet-owners.service';
import { PetOwnersController } from './pet-owners.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [PetOwnersController],
  providers: [PetOwnersService],
  imports: [PrismaModule],
})
export class PetOwnersModule {}
