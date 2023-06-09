import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import UserEntity from '../users/entities/user.entity';
import User from '../users/user.decorator';
import CreatePetDto from './dto/create-pet.dto';
import UpdatePetDto from './dto/update-pet.dto';
import PetEntity from './entities/pet.entity';
import PetsService from './pets.service';

@Controller('pets')
@ApiTags('pets')
@ApiBearerAuth()
export default class PetsController {
  // Todo : Make a difference between admin route and user route

  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiCreatedResponse({ type: PetEntity })
  async create(@Body() createPetDto: CreatePetDto, @User() user: UserEntity) {
    return new PetEntity(
      await this.petsService.create(createPetDto, user.petOwner),
    );
  }

  @Get()
  @ApiOkResponse({ type: PetEntity, isArray: true })
  async findAll(@User() user: UserEntity) {
    return (await this.petsService.findAll(user.petOwner)).map(
      (pet) => new PetEntity(pet),
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: PetEntity })
  async findOne(@Param('id') id: number, @User() user: UserEntity) {
    return new PetEntity(await this.petsService.findOne(id, user.petOwner));
  }

  @Patch(':id')
  @ApiOkResponse({ type: PetEntity })
  async update(
    @Param('id') id: number,
    @Body() updatePetDto: UpdatePetDto,
    @User() user: UserEntity,
  ) {
    return new PetEntity(
      await this.petsService.update(id, updatePetDto, user.petOwner),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: PetEntity })
  async remove(@Param('id') id: number, @User() user: UserEntity) {
    return new PetEntity(await this.petsService.remove(id, user.petOwner));
  }
}
