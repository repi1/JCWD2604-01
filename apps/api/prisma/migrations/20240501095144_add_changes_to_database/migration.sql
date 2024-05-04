/*
  Warnings:

  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stockhistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vouchers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- DropForeignKey
ALTER TABLE `stockhistory` DROP FOREIGN KEY `StockHistory_stockId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderDetails` DROP FOREIGN KEY `OrderDetails_orderId_fkey`;

-- DropIndex
DROP INDEX `OrderDetails_orderId_fkey` ON `OrderDetails`;

-- DropForeignKey
ALTER TABLE `Stocks` DROP FOREIGN KEY `Stocks_storeId_fkey`;

-- DropIndex
DROP INDEX `Stocks_storeId_fkey` ON `Stocks`;

-- DropForeignKey
ALTER TABLE `UserVouchers` DROP FOREIGN KEY `UserVouchers_voucherId_fkey`;

-- DropIndex
DROP INDEX `UserVouchers_voucherId_fkey` ON `UserVouchers`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_storeId_fkey`;

-- DropIndex
DROP INDEX `Users_storeId_fkey` ON `Users`;

-- DropForeignKey
ALTER TABLE `StockHistory` DROP FOREIGN KEY `StockHistory_orderId_fkey`;

-- DropTable
DROP TABLE `orders`;

-- DropTable
DROP TABLE `stockhistory`;

-- DropTable
DROP TABLE `stores`;

-- DropTable
DROP TABLE `vouchers`;

-- CreateTable
CREATE TABLE `Stores` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `streetName` VARCHAR(255) NOT NULL,
    `cityId` VARCHAR(255) NOT NULL,
    `longitude` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Stores_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` VARCHAR(255) NOT NULL,
    `invoiceNo` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `storeId` VARCHAR(255) NOT NULL,
    `status` ENUM('paymentPending', 'paymentConfirmation', 'processing', 'delivered', 'deliveryDone', 'cancelled') NOT NULL DEFAULT 'paymentPending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveredAt` DATETIME(3) NULL,
    `streetName` VARCHAR(255) NOT NULL,
    `cityId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Orders_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockHistory` (
    `id` VARCHAR(255) NOT NULL,
    `orderId` VARCHAR(255) NULL,
    `stockId` VARCHAR(255) NOT NULL,
    `status` ENUM('in', 'out') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `qty` DECIMAL(18, 2) NOT NULL,
    `note` VARCHAR(191) NULL,

    UNIQUE INDEX `StockHistory_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vouchers` (
    `id` VARCHAR(255) NOT NULL,
    `type` ENUM('ongkir', 'discount') NOT NULL,
    `amount` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `percentage` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Vouchers_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stocks`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserVouchers` ADD CONSTRAINT `UserVouchers_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Vouchers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
