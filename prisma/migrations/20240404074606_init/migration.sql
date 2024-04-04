-- CreateTable
CREATE TABLE `userBorrowHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `borrow_date` DATETIME(3) NOT NULL,
    `return_date` DATETIME(3) NULL,
    `penalty_applied` BOOLEAN NOT NULL,
    `member_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userBorrowHistory` ADD CONSTRAINT `userBorrowHistory_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userBorrowHistory` ADD CONSTRAINT `userBorrowHistory_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
