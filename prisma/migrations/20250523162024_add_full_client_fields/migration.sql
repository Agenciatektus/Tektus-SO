-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('ativo', 'nao_iniciado', 'pausado', 'aviso_30_dias', 'finalizado');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pendente', 'em_dia', 'parcialmente_pago', 'atrasado', 'cortesia');

-- CreateEnum
CREATE TYPE "ProjectPhase" AS ENUM ('passagem_de_bastao', 'onboarding', 'planejamento', 'em_execucao', 'revisao_interna', 'monitoramento', 'concluido', 'offboarding');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('recorrente', 'pontual', 'coproducao');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "adBudget" DOUBLE PRECISION,
ADD COLUMN     "clientType" "ClientType" DEFAULT 'recorrente',
ADD COLUMN     "contractEnd" TIMESTAMP(3),
ADD COLUMN     "contractLink" TEXT,
ADD COLUMN     "contractValue" DOUBLE PRECISION,
ADD COLUMN     "customerSuccessId" INTEGER,
ADD COLUMN     "employees" INTEGER,
ADD COLUMN     "ltv" DOUBLE PRECISION,
ADD COLUMN     "mainContact" TEXT,
ADD COLUMN     "paymentDay" INTEGER,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'pendente',
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "projectPhase" "ProjectPhase",
ADD COLUMN     "retention" INTEGER,
ADD COLUMN     "saleDate" TIMESTAMP(3),
ADD COLUMN     "status" "ClientStatus" NOT NULL DEFAULT 'ativo';

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_customerSuccessId_fkey" FOREIGN KEY ("customerSuccessId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
