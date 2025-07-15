/*
  Warnings:

  - You are about to alter the column `amount` on the `Budgets` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Budgets" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE INDEX "Budgets_userId_idx" ON "Budgets"("userId");

-- CreateIndex
CREATE INDEX "Budgets_categoryId_idx" ON "Budgets"("categoryId");

-- CreateIndex
CREATE INDEX "Categories_userId_idx" ON "Categories"("userId");

-- CreateIndex
CREATE INDEX "Transactions_userId_idx" ON "Transactions"("userId");

-- CreateIndex
CREATE INDEX "Transactions_categoryId_idx" ON "Transactions"("categoryId");
