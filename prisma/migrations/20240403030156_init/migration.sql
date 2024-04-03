/*
  Warnings:

  - You are about to drop the column `quantity` on the `book` table. All the data in the column will be lost.
  - Added the required column `stock` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `quantity`,
    ADD COLUMN `stock` INTEGER NOT NULL;
