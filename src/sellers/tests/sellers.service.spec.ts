import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSellerDto } from '../dto/create-seller.dto';
import { UpdateSellerDto } from '../dto/update-seller.dto';
import { SellersService } from '../sellers.service';

describe('SellersService', () => {
  let service: SellersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellersService, PrismaService],
    }).compile();

    service = module.get<SellersService>(SellersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should create a Seller', async () => {
    const data: CreateSellerDto = {
      name: 'Jest Seller',
    };

    prisma.seller.create = jest.fn().mockResolvedValueOnce({
      ...data,
      id: 1,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    });

    const Seller = await service.create(data);

    expect(prisma.seller.create).toBeCalled();
    expect(Seller).toMatchObject(data);
  });

  it('should read a Seller', async () => {
    const mockResponse = {
      id: 1,
      name: 'Jest Seller',
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    };

    prisma.seller.findUnique = jest.fn().mockResolvedValueOnce(mockResponse);

    const Seller = await service.findOne(1);

    expect(prisma.seller.findUnique).toBeCalled();
    expect(Seller).toMatchObject(mockResponse);
  });

  it('should update a Seller', async () => {
    const data: UpdateSellerDto = {
      name: 'Jest Seller',
    };

    const mockResponse = {
      id: 1,
      name: data.name,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    };

    prisma.seller.update = jest.fn().mockResolvedValueOnce(mockResponse);

    const Seller = await service.update(1, data);

    expect(prisma.seller.update).toBeCalled();
    expect(Seller).toMatchObject(mockResponse);
  });

  it('should delete a Seller', async () => {
    const id = 1;

    prisma.seller.delete = jest.fn().mockResolvedValueOnce(void 0);

    await service.remove(id);

    expect(prisma.seller.delete).toBeCalledWith({ where: { id } });
  });
});
