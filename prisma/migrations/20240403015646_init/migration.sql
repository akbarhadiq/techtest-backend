-- AlterTable
ALTER TABLE `borrowedbook` MODIFY `penalty_applied` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `member` MODIFY `penalty_status` BOOLEAN NOT NULL DEFAULT false;
