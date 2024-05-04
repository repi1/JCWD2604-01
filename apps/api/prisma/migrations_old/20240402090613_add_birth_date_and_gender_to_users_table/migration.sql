/*
  Warnings:

  - Added the required column `birthDate` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `gender` ENUM('male', 'female') NOT NULL DEFAULT 'male';
