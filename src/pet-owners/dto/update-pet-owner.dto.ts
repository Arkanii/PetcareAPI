import { PartialType } from '@nestjs/swagger';

import CreatePetOwnerDto from './create-pet-owner.dto';

export default class UpdatePetOwnerDto extends PartialType(CreatePetOwnerDto) {}
