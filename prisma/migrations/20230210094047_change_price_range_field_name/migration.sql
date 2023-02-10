/*
  Warnings:

  - You are about to drop the column `price_range` on the `Product` table. All the data in the column will be lost.
  - Added the required column `priceRange` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price_range",
ADD COLUMN     "priceRange" MONEY NOT NULL;
