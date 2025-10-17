/*
  Warnings:

  - A unique constraint covering the columns `[unique_name]` on the table `playlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unique_name` to the `playlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."playlist_title_key";

-- AlterTable
ALTER TABLE "public"."playlist" ADD COLUMN     "unique_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "playlist_unique_name_key" ON "public"."playlist"("unique_name");
