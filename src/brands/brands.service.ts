import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BrandCreateInput) {
    return this.prisma.brand.create({ data });
  }

  async findAll() {
    return this.prisma.brand.findMany();
  }

  async findOne(id: number) {
    return this.prisma.brand.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async update(id: number, data: Prisma.BrandUpdateInput) {
    return this.prisma.brand.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.brand.delete({ where: { id } });
  }
}
