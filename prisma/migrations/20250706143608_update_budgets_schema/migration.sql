/*
  Warnings:

  - A unique constraint covering the columns `[userId,categoryId,month,year]` on the table `Budgets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Budgets_categoryId_key";

-- DropIndex
DROP INDEX "Budgets_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Budgets_userId_categoryId_month_year_key" ON "Budgets"("userId", "categoryId", "month", "year");
