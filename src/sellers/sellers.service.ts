import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SellersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SellerCreateInput) {
    return this.prisma.seller.create({ data });
  }

  async findAll() {
    return this.prisma.seller.findMany();
  }

  async findOne(id: number) {
    return this.prisma.seller.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.SellerUpdateInput) {
    return this.prisma.seller.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.seller.delete({ where: { id } });
  }
}
