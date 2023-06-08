/*
  Warnings:

  - Changed the type of `is_admin` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "is_admin",
ADD COLUMN     "is_admin" "Role" NOT NULL;
