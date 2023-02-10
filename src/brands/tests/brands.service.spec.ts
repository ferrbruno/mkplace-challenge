import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma.service';
import { BrandsService } from '../brands.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

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
    expect(prisma).toBeDefined();
  });

  it('should create a brand', async () => {
    const data: CreateBrandDto = {
      name: 'Jest Brand',
    };

    prisma.brand.create = jest.fn().mockResolvedValueOnce({
      ...data,
      id: 1,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    });

    const brand = await service.create(data);

    expect(prisma.brand.create).toBeCalled();
    expect(brand).toMatchObject(data);
  });

  it('should read a brand', async () => {
    const mockResponse = {
      id: 1,
      name: 'Jest Brand',
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    };

    prisma.brand.findUnique = jest.fn().mockResolvedValueOnce(mockResponse);

    const brand = await service.findOne(1);

    expect(prisma.brand.findUnique).toBeCalled();
    expect(brand).toMatchObject(mockResponse);
  });

  it('should update a brand', async () => {
    const data: UpdateBrandDto = {
      name: 'Jest Brand',
    };

    const mockResponse = {
      id: 1,
      name: data.name,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    };

    prisma.brand.update = jest.fn().mockResolvedValueOnce(mockResponse);

    const brand = await service.update(1, data);

    expect(prisma.brand.update).toBeCalled();
    expect(brand).toMatchObject(mockResponse);
  });

  it('should delete a brand', async () => {
    const id = 1;

    prisma.brand.delete = jest.fn().mockResolvedValueOnce(void 0);

    await service.remove(id);

    expect(prisma.brand.delete).toBeCalledWith({ where: { id } });
  });
});
