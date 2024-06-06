/*
  Warnings:

  - A unique constraint covering the columns `[id_customers,id_kamar]` on the table `reservasi` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `reservasi` DROP FOREIGN KEY `reservasi_id_customers_fkey`;

-- DropForeignKey
ALTER TABLE `reservasi` DROP FOREIGN KEY `reservasi_id_kamar_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Unique_Customers_Kamar` ON `reservasi`(`id_customers`, `id_kamar`);

-- AddForeignKey
ALTER TABLE `reservasi` ADD CONSTRAINT `Reservasi_Customers_fkey` FOREIGN KEY (`id_customers`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservasi` ADD CONSTRAINT `Reservasi_Kamar_fkey` FOREIGN KEY (`id_kamar`) REFERENCES `kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
