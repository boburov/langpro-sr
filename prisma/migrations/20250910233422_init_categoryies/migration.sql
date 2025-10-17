-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'OWNER';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "coin" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_verifyed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."Courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."show_history" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "showed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "show_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lessons" (
    "id" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vocabulary" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "org_version" TEXT NOT NULL,
    "lessonsId" TEXT,

    CONSTRAINT "vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Courses_title_key" ON "public"."Courses"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_course_id_key" ON "public"."Courses"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "public"."category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_video_url_key" ON "public"."lessons"("video_url");

-- AddForeignKey
ALTER TABLE "public"."Courses" ADD CONSTRAINT "Courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."show_history" ADD CONSTRAINT "show_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lessons" ADD CONSTRAINT "lessons_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vocabulary" ADD CONSTRAINT "vocabulary_lessonsId_fkey" FOREIGN KEY ("lessonsId") REFERENCES "public"."lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
