import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PetEntity } from './entities/pet.entity';

@Controller('pets')
@ApiTags('pets')
@ApiBearerAuth()
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiCreatedResponse({ type: PetEntity })
  async create(@Body() createPetDto: CreatePetDto) {
    return new PetEntity(await this.petsService.create(createPetDto));
  }

  @Get()
  @ApiOkResponse({ type: PetEntity, isArray: true })
  async findAll() {
    return (await this.petsService.findAll()).map((pet) => new PetEntity(pet));
  }

  @Get(':id')
  @ApiOkResponse({ type: PetEntity })
  async findOne(@Param('id') id: number) {
    return new PetEntity(await this.petsService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: PetEntity })
  async update(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return new PetEntity(await this.petsService.update(id, updatePetDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: PetEntity })
  async remove(@Param('id') id: number) {
    return new PetEntity(await this.petsService.remove(id));
  }
}
