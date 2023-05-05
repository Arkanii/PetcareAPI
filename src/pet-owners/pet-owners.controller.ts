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

import CreatePetOwnerDto from './dto/create-pet-owner.dto';
import UpdatePetOwnerDto from './dto/update-pet-owner.dto';
import PetOwnerEntity from './entities/pet-owner.entity';
import PetOwnersService from './pet-owners.service';

@Controller('petOwners')
@ApiTags('petOwners')
@ApiBearerAuth()
export default class PetOwnersController {
  constructor(private readonly petOwnersService: PetOwnersService) {}

  @Post()
  @ApiCreatedResponse({ type: PetOwnerEntity })
  async create(@Body() createPetOwnerDto: CreatePetOwnerDto) {
    return new PetOwnerEntity(
      await this.petOwnersService.create(createPetOwnerDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: PetOwnerEntity, isArray: true })
  async findAll() {
    return (await this.petOwnersService.findAll()).map(
      (petOwner) => new PetOwnerEntity(petOwner),
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: PetOwnerEntity })
  async findOne(@Param('id') id: number) {
    return new PetOwnerEntity(await this.petOwnersService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: PetOwnerEntity })
  async update(
    @Param('id') id: number,
    @Body() updatePetOwnerDto: UpdatePetOwnerDto,
  ) {
    return new PetOwnerEntity(
      await this.petOwnersService.update(id, updatePetOwnerDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: PetOwnerEntity })
  async remove(@Param('id') id: number) {
    return new PetOwnerEntity(await this.petOwnersService.remove(id));
  }
}
