-- DropForeignKeyConstraint
-- ALTER TABLE `Addresses` DROP FOREIGN KEY `Addresses_userId_fkey`;

-- ALTER TABLE `Stores` DROP FOREIGN KEY `Stores_userId_fkey`;

-- ALTER TABLE `Carts` DROP FOREIGN KEY `Carts_userId_fkey`;

-- ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- ALTER TABLE `UserVouchers` DROP FOREIGN KEY `UserVouchers_userId_fkey`;

-- ALTER TABLE `UserVouchers` DROP FOREIGN KEY `UserVouchers_voucherId_fkey`;


-- DropTable
-- DROP TABLE `users`;

-- DropIndex
-- DROP INDEX `Addresses_userId_fkey` ON `Addresses`;

-- DropIndex
-- DROP INDEX `Orders_userId_fkey` ON `Orders`;

-- DropIndex
-- DROP INDEX `Stores_userId_fkey` ON `Stores`;

-- DropIndex
-- DROP INDEX `UserVouchers_voucherId_fkey` ON `UserVouchers`;

-- DropTable
-- DROP TABLE `vouchers`;

-- CreateTable
-- CREATE TABLE `Users` (
--     `id` VARCHAR(255) NOT NULL,
--     `referralNum` VARCHAR(255) NOT NULL,
--     `email` VARCHAR(255) NOT NULL,
--     `password` VARCHAR(255) NOT NULL,
--     `name` VARCHAR(255) NOT NULL,
--     `gender` ENUM('male', 'female') NOT NULL DEFAULT 'male',
--     `birthDate` DATETIME(3) NOT NULL,
--     `avatarURL` VARCHAR(255) NULL,
--     `role` ENUM('user', 'storeAdmin', 'superAdmin') NOT NULL DEFAULT 'user',
--     `isVerified` BOOLEAN NOT NULL DEFAULT false,
--     `isReset` BOOLEAN NOT NULL DEFAULT false,
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     UNIQUE INDEX `Users_id_key`(`id`),
--     UNIQUE INDEX `Users_referralNum_key`(`referralNum`),
--     UNIQUE INDEX `Users_email_key`(`email`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Vouchers` (
--     `id` VARCHAR(255) NOT NULL,
--     `type` ENUM('ongkir', 'discount') NOT NULL,
--     `amount` DECIMAL(18, 2) NOT NULL DEFAULT 0,
--     `percentage` INTEGER NOT NULL DEFAULT 0,

--     UNIQUE INDEX `Vouchers_id_key`(`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- AddForeignKey
-- ALTER TABLE `Addresses` ADD CONSTRAINT `Addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- -- AddForeignKey
-- ALTER TABLE `Stores` ADD CONSTRAINT `Stores_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- -- AddForeignKey
-- ALTER TABLE `Carts` ADD CONSTRAINT `Carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- -- AddForeignKey
-- ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- -- AddForeignKey
-- ALTER TABLE `UserVouchers` ADD CONSTRAINT `UserVouchers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- -- AddForeignKey
-- ALTER TABLE `UserVouchers` ADD CONSTRAINT `UserVouchers_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Vouchers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
