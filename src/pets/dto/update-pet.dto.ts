import { PartialType } from '@nestjs/swagger';

import CreatePetDto from './create-pet.dto';

export default class UpdatePetDto extends PartialType(CreatePetDto) {}
