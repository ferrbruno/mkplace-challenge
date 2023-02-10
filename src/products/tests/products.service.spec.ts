import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsService } from '../products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const data: CreateProductDto = {
      brand: 'test brand',
      name: 'test product',
      priceRange: 500,
      seller: 'test seller',
    };

    prisma.product.create = jest.fn().mockResolvedValueOnce(data);

    const product = await service.create({
      ...data,
      brand: {
        connectOrCreate: {
          where: { name: data.brand },
          create: { name: data.brand },
        },
      },
      seller: {
        connectOrCreate: {
          where: { name: data.seller },
          create: { name: data.seller },
        },
      },
    });

    expect(prisma.product.create).toBeCalled();
    expect(product).toMatchObject(data);
  });

  it('should read a product', async () => {
    const mockResponse = {
      brand: 'test brand',
      name: 'test product',
      priceRange: 500,
      seller: 'test seller',
    };

    prisma.product.findUnique = jest.fn().mockResolvedValueOnce(mockResponse);

    const product = await service.findById(1);

    expect(prisma.product.findUnique).toBeCalled();
    expect(product).toMatchObject(mockResponse);
  });

  it('should update a product', async () => {
    const data: UpdateProductDto = {
      brand: 'test brand',
      name: 'test product',
      priceRange: 500,
      seller: 'test seller',
    };

    prisma.product.update = jest.fn().mockResolvedValueOnce(data);

    const product = await service.update(1, {
      ...data,
      brand: {
        connectOrCreate: {
          where: { name: data.brand },
          create: { name: data.brand },
        },
      },
      seller: {
        connectOrCreate: {
          where: { name: data.seller },
          create: { name: data.seller },
        },
      },
    });

    expect(prisma.product.update).toBeCalled();
    expect(product).toMatchObject(data);
  });

  it('should delete a product', async () => {
    prisma.product.delete = jest.fn().mockResolvedValueOnce(void 0);

    await service.remove(1);

    expect(prisma.product.delete).toBeCalled();
  });
});
