import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [PetsController],
  providers: [PetsService],
  imports: [PrismaModule],
})
export class PetsModule {}
