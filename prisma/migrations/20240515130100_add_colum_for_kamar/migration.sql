/*
  Warnings:

  - You are about to drop the column `jumlah_kamar` on the `kamar` table. All the data in the column will be lost.
  - Added the required column `description` to the `Kamar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlah_kasur` to the `Kamar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_kamar` to the `Kamar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kamar` DROP COLUMN `jumlah_kamar`,
    ADD COLUMN `description` LONGTEXT NOT NULL,
    ADD COLUMN `jumlah_kasur` INTEGER NOT NULL,
    ADD COLUMN `no_kamar` VARCHAR(191) NOT NULL;
