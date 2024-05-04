/*
  Warnings:

  - You are about to drop the column `userId` on the `stores` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `stores` DROP FOREIGN KEY `Stores_userId_fkey`;

-- AlterTable
ALTER TABLE `stores` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `storeId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
