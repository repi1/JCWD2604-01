/*
  Warnings:

  - A unique constraint covering the columns `[referralNum]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `avatarURL` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_referralNum_key` ON `Users`(`referralNum`);
