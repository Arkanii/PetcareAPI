import { Module } from '@nestjs/common';

import PetOwnersController from './pet-owners.controller';
import PetOwnersService from './pet-owners.service';

@Module({
  controllers: [PetOwnersController],
  providers: [PetOwnersService],
})
export default class PetOwnersModule {}
