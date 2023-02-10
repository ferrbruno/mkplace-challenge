import { Brand as BrandModel } from '@prisma/client';

export class Brand implements BrandModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
