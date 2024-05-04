/*
  Warnings:

  - You are about to drop the column `provinceId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `City` DROP COLUMN `provinceId`;

-- DropTable
DROP TABLE `Province`;
