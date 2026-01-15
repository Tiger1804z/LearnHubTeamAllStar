/*
  Warnings:

  - Made the column `displayName` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "displayName" SET NOT NULL,
ALTER COLUMN "displayName" SET DEFAULT '';
