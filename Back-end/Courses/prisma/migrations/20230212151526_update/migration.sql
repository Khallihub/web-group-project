-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CourseName` VARCHAR(191) NOT NULL,
    `CourseDescription` VARCHAR(1000) NOT NULL,

    UNIQUE INDEX `Course_CourseName_key`(`CourseName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TopicName` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `videoTranscript` TEXT NOT NULL,
    `video` VARCHAR(191) NOT NULL,
    `audio` VARCHAR(191) NOT NULL,
    `courseId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `FullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `PhoneNumber` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Topics` ADD CONSTRAINT `Topics_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
