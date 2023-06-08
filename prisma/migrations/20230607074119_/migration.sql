/*
  Warnings:

  - You are about to drop the column `is_admin` on the `Users` table. All the data in the column will be lost.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "is_admin",
ADD COLUMN     "role" "Role" NOT NULL;
