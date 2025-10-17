-- AddForeignKey
ALTER TABLE "public"."show_history" ADD CONSTRAINT "show_history_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
