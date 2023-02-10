import { Seller as SellerModel } from '@prisma/client';

export class Seller implements SellerModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
