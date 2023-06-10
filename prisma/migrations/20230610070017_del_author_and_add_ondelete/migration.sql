/*
  Warnings:

  - You are about to drop the column `author` on the `Threads` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_id_thread_fkey";

-- DropForeignKey
ALTER TABLE "Threads" DROP CONSTRAINT "Threads_id_campus_fkey";

-- DropForeignKey
ALTER TABLE "Threads" DROP CONSTRAINT "Threads_id_user_fkey";

-- AlterTable
ALTER TABLE "Threads" DROP COLUMN "author";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_id_thread_fkey" FOREIGN KEY ("id_thread") REFERENCES "Threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_id_campus_fkey" FOREIGN KEY ("id_campus") REFERENCES "Campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
