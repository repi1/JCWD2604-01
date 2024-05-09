/*
  Warnings:

  - Made the column `amount` on table `vouchers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentage` on table `vouchers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vouchers` MODIFY `amount` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    MODIFY `percentage` INTEGER NOT NULL DEFAULT 0;
