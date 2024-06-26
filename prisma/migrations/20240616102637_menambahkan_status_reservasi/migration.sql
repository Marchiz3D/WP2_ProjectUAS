/*
  Warnings:

  - Added the required column `status_reservasi` to the `reservasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservasi` ADD COLUMN `status_reservasi` VARCHAR(191) NOT NULL;
