import { Test, TestingModule } from '@nestjs/testing';
import { PetOwnersController } from './pet-owners.controller';
import { PetOwnersService } from './pet-owners.service';

describe('PetOwnersController', () => {
  let controller: PetOwnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetOwnersController],
      providers: [PetOwnersService],
    }).compile();

    controller = module.get<PetOwnersController>(PetOwnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
