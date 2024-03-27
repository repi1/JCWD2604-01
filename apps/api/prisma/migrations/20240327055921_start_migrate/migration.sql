/*
  Warnings:

  - You are about to drop the `samples` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `samples`;

-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(255) NOT NULL,
    `referralNum` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `avatarURL` VARCHAR(255) NOT NULL,
    `role` ENUM('user', 'storeAdmin', 'superAdmin') NOT NULL DEFAULT 'user',
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `isReset` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Addresses` (
    `id` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `streetName` VARCHAR(255) NOT NULL,
    `cityId` VARCHAR(255) NOT NULL,
    `longitude` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Addresses_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Province` (
    `id` VARCHAR(255) NOT NULL,
    `provinceName` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Province_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `id` VARCHAR(255) NOT NULL,
    `cityName` VARCHAR(255) NOT NULL,
    `provinceId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `City_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kurir` (
    `id` VARCHAR(255) NOT NULL,
    `kurirName` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Kurir_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(18, 2) NOT NULL,
    `categoryId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Products_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Categories_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductPhotos` (
    `id` VARCHAR(255) NOT NULL,
    `productId` VARCHAR(255) NOT NULL,
    `photoURL` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `ProductPhotos_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stores` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `streetName` VARCHAR(255) NOT NULL,
    `cityId` VARCHAR(255) NOT NULL,
    `longitude` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Stores_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `id` VARCHAR(255) NOT NULL,
    `productId` VARCHAR(255) NOT NULL,
    `storeId` VARCHAR(255) NOT NULL,
    `stock` DECIMAL(18, 2) NOT NULL,

    UNIQUE INDEX `Stocks_id_key`(`id`),
    PRIMARY KEY (`productId`, `storeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carts` (
    `userId` VARCHAR(255) NOT NULL,
    `productId` VARCHAR(255) NOT NULL,
    `qty` DECIMAL(18, 2) NOT NULL,

    PRIMARY KEY (`userId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` VARCHAR(255) NOT NULL,
    `invoiceNo` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `storeId` VARCHAR(255) NOT NULL,
    `status` ENUM('paymentPending', 'paymentConfirmation', 'processing', 'delivered', 'deliveryDone', 'cancelled') NOT NULL DEFAULT 'paymentPending',
    `createdAt` DATETIME(3) NOT NULL,
    `deliveredAt` DATETIME(3) NOT NULL,
    `streetName` VARCHAR(255) NOT NULL,
    `cityId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Orders_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderDetails` (
    `id` VARCHAR(255) NOT NULL,
    `orderId` VARCHAR(255) NOT NULL,
    `stockId` VARCHAR(255) NOT NULL,
    `qty` DECIMAL(18, 2) NOT NULL,
    `price` DECIMAL(18, 2) NOT NULL,

    UNIQUE INDEX `OrderDetails_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockHistory` (
    `id` VARCHAR(255) NOT NULL,
    `orderId` VARCHAR(255) NOT NULL,
    `stockId` VARCHAR(255) NOT NULL,
    `status` ENUM('in', 'out') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `qty` DECIMAL(18, 2) NOT NULL,

    UNIQUE INDEX `StockHistory_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vouchers` (
    `id` VARCHAR(255) NOT NULL,
    `type` ENUM('ongkir', 'discount') NOT NULL,
    `amount` DECIMAL(18, 2) NOT NULL,
    `percentage` INTEGER NOT NULL,

    UNIQUE INDEX `Vouchers_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserVouchers` (
    `userId` VARCHAR(255) NOT NULL,
    `voucherId` VARCHAR(255) NOT NULL,
    `expiredAt` DATETIME(3) NOT NULL,
    `isValid` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`userId`, `voucherId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promos` (
    `id` VARCHAR(255) NOT NULL,
    `type` ENUM('buyget', 'discount') NOT NULL,
    `productId` VARCHAR(255) NOT NULL,
    `percentage` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `isValid` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Promos_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Addresses` ADD CONSTRAINT `Addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductPhotos` ADD CONSTRAINT `ProductPhotos_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Stores` ADD CONSTRAINT `Stores_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stocks`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stocks`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserVouchers` ADD CONSTRAINT `UserVouchers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserVouchers` ADD CONSTRAINT `UserVouchers_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Vouchers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Promos` ADD CONSTRAINT `Promos_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
