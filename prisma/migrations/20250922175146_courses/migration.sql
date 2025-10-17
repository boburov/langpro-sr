/*
  Warnings:

  - You are about to drop the column `course_id` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `org_version` on the `vocabulary` table. All the data in the column will be lost.
  - Added the required column `playlistId` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Courses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `translation` to the `vocabulary` table without a default value. This is not possible if the table is not empty.
  - Made the column `lessonsId` on table `vocabulary` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Courses" DROP CONSTRAINT "Courses_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."vocabulary" DROP CONSTRAINT "vocabulary_lessonsId_fkey";

-- DropIndex
DROP INDEX "public"."Courses_course_id_key";

-- DropIndex
DROP INDEX "public"."Courses_title_key";

-- AlterTable
ALTER TABLE "public"."Courses" DROP COLUMN "course_id",
DROP COLUMN "title",
ADD COLUMN     "playlistId" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."vocabulary" DROP COLUMN "org_version",
ADD COLUMN     "translation" TEXT NOT NULL,
ALTER COLUMN "lessonsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Courses" ADD CONSTRAINT "Courses_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "public"."playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Courses" ADD CONSTRAINT "Courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vocabulary" ADD CONSTRAINT "vocabulary_lessonsId_fkey" FOREIGN KEY ("lessonsId") REFERENCES "public"."lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
