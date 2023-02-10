import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

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
    try {
      return await this.prisma.brand.update({ where: { id }, data });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException('Brand not found.');
        }
      }

      throw err;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.brand.delete({ where: { id } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException('Brand not found.');
        }
      }

      throw err;
    }
  }
}
