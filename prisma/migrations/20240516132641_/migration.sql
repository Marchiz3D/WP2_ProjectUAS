/*
  Warnings:

  - You are about to drop the column `id_customers` on the `kamar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_kamar]` on the table `Reservasi` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `kamar` DROP FOREIGN KEY `Kamar_id_customers_fkey`;

-- AlterTable
ALTER TABLE `kamar` DROP COLUMN `id_customers`;

-- CreateIndex
CREATE UNIQUE INDEX `Reservasi_id_kamar_key` ON `Reservasi`(`id_kamar`);
