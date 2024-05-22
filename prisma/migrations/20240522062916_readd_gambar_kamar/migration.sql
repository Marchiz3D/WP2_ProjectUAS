/*
  Warnings:

  - You are about to drop the column `gambar_kamar` on the `reservasi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `kamar` ADD COLUMN `gambar_kamar` TEXT NULL;

-- AlterTable
ALTER TABLE `reservasi` DROP COLUMN `gambar_kamar`;
