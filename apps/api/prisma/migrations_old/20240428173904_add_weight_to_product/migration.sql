/*
  Warnings:

  - Added the required column `weight` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Products` ADD COLUMN `weight` DECIMAL(18, 2) NOT NULL;
