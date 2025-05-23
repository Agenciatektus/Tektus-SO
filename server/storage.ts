import { PrismaClient } from "@prisma/client";
import { InsertUser } from "@shared/schema";

const prisma = new PrismaClient();

export const storage = {
  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({ 
      where: { username },
      include: {
        sessions: true
      }
    });
  },

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ 
      where: { email },
      include: {
        sessions: true
      }
    });
  },

  async createUser(data: InsertUser) {
    return await prisma.user.create({ 
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role || "operations",
        isActive: true
      },
      include: {
        sessions: true
      }
    });
  },

  async updateUser(id: number, data: Partial<{ username: string; email: string; password: string }>) {
    return await prisma.user.update({
      where: { id },
      data,
      include: {
        sessions: true
      }
    });
  },

  async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        sessions: true
      }
    });
  },

  async getUser(id: number) {
    return await prisma.user.findUnique({ 
      where: { id },
      include: {
        sessions: true
      }
    });
  },

  // Dashboard Analytics
  async getDashboardStats() {
    const totalClients = await prisma.client.count();
    const totalProjects = await prisma.project.count();
    const totalTasks = await prisma.task.count();
    const totalRevenue = await prisma.invoice.aggregate({
      _sum: {
        amount: true
      }
    });

    return {
      totalClients,
      totalProjects,
      totalTasks,
      totalRevenue: totalRevenue._sum.amount || 0
    };
  },

  async getClientHealthDistribution() {
    const clients = await prisma.client.findMany({
      select: {
        healthScore: true
      }
    });

    return {
      excellent: clients.filter(c => c.healthScore >= 8).length,
      good: clients.filter(c => c.healthScore >= 6 && c.healthScore < 8).length,
      fair: clients.filter(c => c.healthScore >= 4 && c.healthScore < 6).length,
      poor: clients.filter(c => c.healthScore < 4).length
    };
  },

  async getRevenueByMonth(months: number) {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const invoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: startDate
        }
      },
      select: {
        amount: true,
        createdAt: true
      }
    });

    const revenueByMonth = new Map();
    invoices.forEach(invoice => {
      const month = invoice.createdAt.toISOString().slice(0, 7);
      revenueByMonth.set(month, (revenueByMonth.get(month) || 0) + invoice.amount);
    });

    return Array.from(revenueByMonth.entries()).map(([month, amount]) => ({
      month,
      amount
    }));
  },

  async getRecentTasks(limit: number) {
    return await prisma.task.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        project: true,
        assignedTo: true
      }
    });
  },

  async getUpcomingTasks(limit: number) {
    return await prisma.task.findMany({
      take: limit,
      where: {
        dueDate: {
          gte: new Date()
        }
      },
      orderBy: {
        dueDate: 'asc'
      },
      include: {
        project: true,
        assignedTo: true
      }
    });
  },

  async getAllClients() {
    return await prisma.client.findMany();
  },

  async getAllTasks() {
    return await prisma.task.findMany({
      include: {
        project: true,
        assignedTo: true,
        // Adicione outros relacionamentos se necessário
      }
    });
  }
};
