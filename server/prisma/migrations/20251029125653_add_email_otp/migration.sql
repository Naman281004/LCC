-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailOtpEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "otpCode" TEXT,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3);
