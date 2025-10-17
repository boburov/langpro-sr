/*
  Warnings:

  - You are about to drop the column `categoryId` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."lessons" DROP CONSTRAINT "lessons_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."lessons" DROP COLUMN "categoryId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "playlistId" TEXT;

-- DropTable
DROP TABLE "public"."category";

-- CreateTable
CREATE TABLE "public"."playlist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "playlist_title_key" ON "public"."playlist"("title");

-- AddForeignKey
ALTER TABLE "public"."lessons" ADD CONSTRAINT "lessons_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "public"."playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
