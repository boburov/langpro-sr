-- DropForeignKey
ALTER TABLE "public"."show_history" DROP CONSTRAINT "show_history_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."show_history" DROP CONSTRAINT "show_history_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."show_history" ADD CONSTRAINT "show_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."show_history" ADD CONSTRAINT "show_history_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
