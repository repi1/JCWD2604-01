-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(255) NOT NULL,
    `referralNum` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL DEFAULT 'male',
    `birthDate` DATETIME(3) NOT NULL,
    `avatarURL` VARCHAR(255) NULL,
    `role` ENUM('user', 'storeAdmin', 'superAdmin') NOT NULL DEFAULT 'user',
    `storeId` VARCHAR(191) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `isReset` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_id_key`(`id`),
    UNIQUE INDEX `Users_referralNum_key`(`referralNum`),
    UNIQUE INDEX `Users_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Addresses` (
    `id` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `streetName` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL DEFAULT ',',
    `longitude` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(255) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Addresses_id_key`(`id`)
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
    `weight` DECIMAL(18, 2) NOT NULL,

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
    `streetName` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL DEFAULT ',',
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
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveredAt` DATETIME(3) NULL,
    `addressId` VARCHAR(255) NULL,

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
ALTER TABLE `Users` ADD CONSTRAINT `Users_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Addresses` ADD CONSTRAINT `Addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductPhotos` ADD CONSTRAINT `ProductPhotos_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Addresses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
