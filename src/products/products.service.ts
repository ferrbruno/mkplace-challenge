import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async find(args: Prisma.ProductFindManyArgs) {
    return this.prisma.product.findMany(args);
  }

  async findById(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        brand: true,
        seller: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
