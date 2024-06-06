-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "scheduleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
