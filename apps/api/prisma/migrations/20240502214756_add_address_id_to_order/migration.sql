/*
  Warnings:

  - You are about to drop the column `city` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `streetName` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `city`,
    DROP COLUMN `streetName`,
    ADD COLUMN `addressId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Addresses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
