/*
  Warnings:

  - You are about to drop the column `cityId` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `Stores` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Addresses` DROP COLUMN `cityId`,
    ADD COLUMN `city` VARCHAR(255) NOT NULL DEFAULT ',';

-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `cityId`,
    ADD COLUMN `city` VARCHAR(255) NOT NULL DEFAULT ',';

-- AlterTable
ALTER TABLE `Stores` DROP COLUMN `cityId`,
    ADD COLUMN `city` VARCHAR(255) NOT NULL DEFAULT ',';

-- DropTable
DROP TABLE `City`;
