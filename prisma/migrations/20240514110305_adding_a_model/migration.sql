-- CreateTable
CREATE TABLE `Customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(10) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Customers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kamar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah_kamar` INTEGER NOT NULL,
    `harga` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_customers` INTEGER NOT NULL,
    `id_kamar` INTEGER NOT NULL,
    `tanggal_checkin` DATETIME(3) NOT NULL,
    `tanggal_checkout` DATETIME(3) NOT NULL,

    INDEX `Reservasi_customersId_kamarId_fkey`(`id_customers`, `id_kamar`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservasi` ADD CONSTRAINT `Reservasi_id_customers_fkey` FOREIGN KEY (`id_customers`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservasi` ADD CONSTRAINT `Reservasi_id_kamar_fkey` FOREIGN KEY (`id_kamar`) REFERENCES `Kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
