/*
  Warnings:

  - Added the required column `lane_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "lane_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_lane_id_fkey" FOREIGN KEY ("lane_id") REFERENCES "lanes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
