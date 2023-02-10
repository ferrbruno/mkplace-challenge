import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma.service';
import { BrandsService } from '../brands.service';

describe('BrandsService', () => {
  let service: BrandsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsService, PrismaService],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('should create a user');
  it.todo('should read a user');
  it.todo('should update a user');
  it.todo('should delete a user');
});
