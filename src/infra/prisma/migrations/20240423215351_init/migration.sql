-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "finishedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "isValided" BOOLEAN;
