import { Module } from '@nestjs/common';
import { PetOwnersService } from './pet-owners.service';
import { PetOwnersController } from './pet-owners.controller';

@Module({
  controllers: [PetOwnersController],
  providers: [PetOwnersService],
})
export class PetOwnersModule {}
