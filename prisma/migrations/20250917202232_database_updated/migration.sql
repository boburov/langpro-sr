/*
  Warnings:

  - You are about to drop the column `coin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "coin",
ALTER COLUMN "profile_pic" SET DEFAULT '',
ALTER COLUMN "google_id" DROP NOT NULL,
ALTER COLUMN "google_id" SET DEFAULT '';
