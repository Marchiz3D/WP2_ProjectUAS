/*
  Warnings:

  - A unique constraint covering the columns `[id_customers]` on the table `Kamar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_customers]` on the table `Reservasi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_customers` to the `Kamar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kamar` ADD COLUMN `id_customers` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Kamar_id_customers_key` ON `Kamar`(`id_customers`);

-- CreateIndex
CREATE UNIQUE INDEX `Reservasi_id_customers_key` ON `Reservasi`(`id_customers`);

-- AddForeignKey
ALTER TABLE `Kamar` ADD CONSTRAINT `Kamar_id_customers_fkey` FOREIGN KEY (`id_customers`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
