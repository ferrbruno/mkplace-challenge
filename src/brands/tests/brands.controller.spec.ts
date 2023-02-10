import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { BrandsController } from '../brands.controller';
import { BrandsService } from '../brands.service';

describe('BrandsController', () => {
  let controller: BrandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [BrandsService, PrismaService],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
