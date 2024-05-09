/*
  Warnings:

  - You are about to drop the column `cityName` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `cityName`,
    ADD COLUMN `city` VARCHAR(255) NOT NULL DEFAULT ',';
