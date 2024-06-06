-- DropForeignKey
ALTER TABLE `reservasi` DROP FOREIGN KEY `Reservasi_id_customers_fkey`;

-- DropForeignKey
ALTER TABLE `reservasi` DROP FOREIGN KEY `Reservasi_id_kamar_fkey`;

-- AlterTable
ALTER TABLE `reservasi` MODIFY `tanggal_checkin` VARCHAR(191) NOT NULL,
    MODIFY `tanggal_checkout` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `reservasi` ADD CONSTRAINT `reservasi_id_customers_fkey` FOREIGN KEY (`id_customers`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservasi` ADD CONSTRAINT `reservasi_id_kamar_fkey` FOREIGN KEY (`id_kamar`) REFERENCES `kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `reservasi` RENAME INDEX `Reservasi_customersId_kamarId_fkey` TO `reservasi_id_customers_id_kamar_idx`;

-- RenameIndex
ALTER TABLE `reservasi` RENAME INDEX `Reservasi_id_kamar_key` TO `reservasi_id_kamar_key`;
