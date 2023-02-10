import { Product as ProductModel } from '@prisma/client';

export class Product implements Omit<ProductModel, 'priceRange'> {
  id: number;
  name: string;
  brandId: number;
  sellerId: number;
  priceRange: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
