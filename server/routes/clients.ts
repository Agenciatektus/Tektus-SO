import { Router } from 'express';
import { db } from '../db';
import { z } from 'zod';

const router = Router();

// Schema de validação para criação/atualização de cliente
const clientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  status: z.enum(["ativo", "nao_iniciado", "pausado", "aviso_30_dias", "finalizado"]).optional(),
  saleDate: z.string().datetime().optional().nullable(),
  contractValue: z.number().optional().nullable(),
  paymentDay: z.number().int().min(1).max(31).optional().nullable(),
  paymentStatus: z.enum(["pendente", "em_dia", "parcialmente_pago", "atrasado", "cortesia"]).optional(),
  projectPhase: z.enum([
    "passagem_de_bastao", "onboarding", "planejamento", "em_execucao", "revisao_interna", "monitoramento", "concluido", "offboarding"
  ]).optional().nullable(),
  clientType: z.enum(["recorrente", "pontual", "coproducao"]).optional(),
  contractEnd: z.string().datetime().optional().nullable(),
  adBudget: z.number().optional().nullable(),
  customerSuccessId: z.number().optional().nullable(),
  mainContact: z.string().optional().nullable(),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional().nullable(),
  employees: z.number().optional().nullable(),
  contractLink: z.string().url().optional().nullable(),
  retention: z.number().optional().nullable(),
  healthScore: z.number().optional(),
});

// Listar todos os clientes com filtros e agrupamentos opcionais
router.get('/clients', async (req, res) => {
  try {
    const { tipo, status } = req.query;
    const where: any = {};
    if (tipo) where.clientType = tipo;
    if (status) where.status = status;
    const clients = await db.client.findMany({
      where,
      include: {
        projects: true,
        invoices: true,
        customerSuccess: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    res.json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Buscar cliente por ID
router.get('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await db.client.findUnique({
      where: { id: Number(id) },
      include: {
        projects: true,
        invoices: true,
        customerSuccess: true,
      },
    });
    
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    
    res.json(client);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});

// Criar novo cliente
router.post('/clients', async (req, res) => {
  try {
    const data = clientSchema.parse(req.body);
    // Calcular LTV se possível
    let ltv = null;
    if (data.contractValue && data.retention) {
      ltv = data.contractValue * data.retention;
    }
    const client = await db.client.create({
      data: { ...data, ltv },
      include: {
        projects: true,
        invoices: true,
        customerSuccess: true,
      },
    });
    
    res.status(201).json(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

// Atualizar cliente
router.put('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = clientSchema.parse(req.body);
    // Calcular LTV se possível
    let ltv = null;
    if (data.contractValue && data.retention) {
      ltv = data.contractValue * data.retention;
    }
    const client = await db.client.update({
      where: { id: Number(id) },
      data: { ...data, ltv },
      include: {
        projects: true,
        invoices: true,
        customerSuccess: true,
      },
    });
    
    res.json(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// Excluir cliente
router.delete('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.client.delete({
      where: { id: Number(id) },
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
});

export default router;
