/*
  Warnings:

  - You are about to drop the column `is_verifyed` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "is_verifyed",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;
