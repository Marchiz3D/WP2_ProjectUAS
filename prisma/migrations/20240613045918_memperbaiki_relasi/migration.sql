-- DropForeignKey
ALTER TABLE `reservasi` DROP FOREIGN KEY `Reservasi_Customers_fkey`;

-- DropForeignKey
ALTER TABLE `reservasi` DROP FOREIGN KEY `Reservasi_Kamar_fkey`;

-- DropIndex
DROP INDEX `reservasi_id_customers_id_kamar_idx` ON `reservasi`;

-- CreateIndex
CREATE INDEX `reservasi_id_customers_id_kamar_tanggal_checkin_idx` ON `reservasi`(`id_customers`, `id_kamar`, `tanggal_checkin`);

-- AddForeignKey
ALTER TABLE `reservasi` ADD CONSTRAINT `reservasi_id_customers_fkey` FOREIGN KEY (`id_customers`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservasi` ADD CONSTRAINT `reservasi_id_kamar_fkey` FOREIGN KEY (`id_kamar`) REFERENCES `kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
