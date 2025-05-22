import { 
  users, clients, projects, tasks, invoices, payments, content, 
  onboardingFlows, offboardingFlows, feedback,
  type User, type InsertUser, type Client, type InsertClient,
  type Project, type InsertProject, type Task, type InsertTask,
  type Invoice, type InsertInvoice, type Payment, type InsertPayment,
  type Content, type InsertContent, type OnboardingFlow, type InsertOnboardingFlow,
  type OffboardingFlow, type InsertOffboardingFlow, type Feedback, type InsertFeedback
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, gte, lte, sql, count } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;

  // Clients
  getClient(id: number): Promise<Client | undefined>;
  getAllClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;
  getClientsByStatus(status: string): Promise<Client[]>;
  getClientsByHealth(health: string): Promise<Client[]>;

  // Projects
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getProjectsByClient(clientId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Tasks
  getTask(id: number): Promise<Task | undefined>;
  getAllTasks(): Promise<Task[]>;
  getTasksByProject(projectId: number): Promise<Task[]>;
  getTasksByClient(clientId: number): Promise<Task[]>;
  getTasksByAssignee(assigneeId: number): Promise<Task[]>;
  getTasksByStatus(status: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
  getRecentTasks(limit?: number): Promise<Task[]>;
  getUpcomingTasks(limit?: number): Promise<Task[]>;

  // Invoices
  getInvoice(id: number): Promise<Invoice | undefined>;
  getAllInvoices(): Promise<Invoice[]>;
  getInvoicesByClient(clientId: number): Promise<Invoice[]>;
  getInvoicesByStatus(status: string): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined>;
  deleteInvoice(id: number): Promise<boolean>;

  // Payments
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentsByInvoice(invoiceId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: number, payment: Partial<InsertPayment>): Promise<Payment | undefined>;

  // Content
  getContent(id: number): Promise<Content | undefined>;
  getAllContent(): Promise<Content[]>;
  getContentByClient(clientId: number): Promise<Content[]>;
  getContentByStatus(status: string): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: number, content: Partial<InsertContent>): Promise<Content | undefined>;
  deleteContent(id: number): Promise<boolean>;

  // Onboarding Flows
  getOnboardingFlow(id: number): Promise<OnboardingFlow | undefined>;
  getOnboardingFlowByClient(clientId: number): Promise<OnboardingFlow | undefined>;
  getAllOnboardingFlows(): Promise<OnboardingFlow[]>;
  createOnboardingFlow(flow: InsertOnboardingFlow): Promise<OnboardingFlow>;
  updateOnboardingFlow(id: number, flow: Partial<InsertOnboardingFlow>): Promise<OnboardingFlow | undefined>;

  // Offboarding Flows
  getOffboardingFlow(id: number): Promise<OffboardingFlow | undefined>;
  getOffboardingFlowByClient(clientId: number): Promise<OffboardingFlow | undefined>;
  getAllOffboardingFlows(): Promise<OffboardingFlow[]>;
  createOffboardingFlow(flow: InsertOffboardingFlow): Promise<OffboardingFlow>;
  updateOffboardingFlow(id: number, flow: Partial<InsertOffboardingFlow>): Promise<OffboardingFlow | undefined>;

  // Feedback
  getFeedback(id: number): Promise<Feedback | undefined>;
  getFeedbackByClient(clientId: number): Promise<Feedback[]>;
  getFeedbackByProject(projectId: number): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  updateFeedback(id: number, feedback: Partial<InsertFeedback>): Promise<Feedback | undefined>;

  // Dashboard Analytics
  getDashboardStats(): Promise<{
    totalRevenue: number;
    activeClients: number;
    tasksCompleted: number;
    teamUtilization: number;
    revenueGrowth: number;
    clientGrowth: number;
    taskGrowth: number;
  }>;
  
  getClientHealthDistribution(): Promise<{
    healthy: number;
    atRisk: number;
    critical: number;
  }>;

  getRevenueByMonth(months: number): Promise<Array<{ month: string; revenue: number }>>;

  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updateUser: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updateUser, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.isActive, true));
  }

  // Clients
  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }

  async getAllClients(): Promise<Client[]> {
    return await db.select().from(clients).orderBy(desc(clients.createdAt));
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db.insert(clients).values(insertClient).returning();
    return client;
  }

  async updateClient(id: number, updateClient: Partial<InsertClient>): Promise<Client | undefined> {
    const [client] = await db
      .update(clients)
      .set({ ...updateClient, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();
    return client || undefined;
  }

  async deleteClient(id: number): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id));
    return result.rowCount > 0;
  }

  async getClientsByStatus(status: string): Promise<Client[]> {
    return await db.select().from(clients).where(eq(clients.status, status as any));
  }

  async getClientsByHealth(health: string): Promise<Client[]> {
    return await db.select().from(clients).where(eq(clients.healthScore, health as any));
  }

  // Projects
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProjectsByClient(clientId: number): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.clientId, clientId));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: number, updateProject: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set({ ...updateProject, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project || undefined;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowCount > 0;
  }

  // Tasks
  async getTask(id: number): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task || undefined;
  }

  async getAllTasks(): Promise<Task[]> {
    return await db.select().from(tasks).orderBy(desc(tasks.createdAt));
  }

  async getTasksByProject(projectId: number): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.projectId, projectId));
  }

  async getTasksByClient(clientId: number): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.clientId, clientId));
  }

  async getTasksByAssignee(assigneeId: number): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.assigneeId, assigneeId));
  }

  async getTasksByStatus(status: string): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.status, status as any));
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const [task] = await db.insert(tasks).values(insertTask).returning();
    return task;
  }

  async updateTask(id: number, updateTask: Partial<InsertTask>): Promise<Task | undefined> {
    const [task] = await db
      .update(tasks)
      .set({ 
        ...updateTask, 
        updatedAt: new Date(),
        ...(updateTask.status === 'completed' ? { completedAt: new Date() } : {})
      })
      .where(eq(tasks.id, id))
      .returning();
    return task || undefined;
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await db.delete(tasks).where(eq(tasks.id, id));
    return result.rowCount > 0;
  }

  async getRecentTasks(limit: number = 10): Promise<Task[]> {
    return await db
      .select()
      .from(tasks)
      .orderBy(desc(tasks.updatedAt))
      .limit(limit);
  }

  async getUpcomingTasks(limit: number = 10): Promise<Task[]> {
    const now = new Date();
    return await db
      .select()
      .from(tasks)
      .where(
        and(
          gte(tasks.dueDate, now),
          or(eq(tasks.status, 'pending'), eq(tasks.status, 'in_progress'))
        )
      )
      .orderBy(tasks.dueDate)
      .limit(limit);
  }

  // Invoices
  async getInvoice(id: number): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice || undefined;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
  }

  async getInvoicesByClient(clientId: number): Promise<Invoice[]> {
    return await db.select().from(invoices).where(eq(invoices.clientId, clientId));
  }

  async getInvoicesByStatus(status: string): Promise<Invoice[]> {
    return await db.select().from(invoices).where(eq(invoices.status, status as any));
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const [invoice] = await db.insert(invoices).values(insertInvoice).returning();
    return invoice;
  }

  async updateInvoice(id: number, updateInvoice: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    const [invoice] = await db
      .update(invoices)
      .set({ 
        ...updateInvoice, 
        updatedAt: new Date(),
        ...(updateInvoice.status === 'paid' ? { paidDate: new Date() } : {})
      })
      .where(eq(invoices.id, id))
      .returning();
    return invoice || undefined;
  }

  async deleteInvoice(id: number): Promise<boolean> {
    const result = await db.delete(invoices).where(eq(invoices.id, id));
    return result.rowCount > 0;
  }

  // Payments
  async getPayment(id: number): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment || undefined;
  }

  async getPaymentsByInvoice(invoiceId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.invoiceId, invoiceId));
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db.insert(payments).values(insertPayment).returning();
    return payment;
  }

  async updatePayment(id: number, updatePayment: Partial<InsertPayment>): Promise<Payment | undefined> {
    const [payment] = await db
      .update(payments)
      .set({ 
        ...updatePayment, 
        updatedAt: new Date(),
        ...(updatePayment.status === 'completed' ? { paidDate: new Date() } : {})
      })
      .where(eq(payments.id, id))
      .returning();
    return payment || undefined;
  }

  // Content
  async getContent(id: number): Promise<Content | undefined> {
    const [contentItem] = await db.select().from(content).where(eq(content.id, id));
    return contentItem || undefined;
  }

  async getAllContent(): Promise<Content[]> {
    return await db.select().from(content).orderBy(desc(content.createdAt));
  }

  async getContentByClient(clientId: number): Promise<Content[]> {
    return await db.select().from(content).where(eq(content.clientId, clientId));
  }

  async getContentByStatus(status: string): Promise<Content[]> {
    return await db.select().from(content).where(eq(content.status, status as any));
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const [contentItem] = await db.insert(content).values(insertContent).returning();
    return contentItem;
  }

  async updateContent(id: number, updateContent: Partial<InsertContent>): Promise<Content | undefined> {
    const [contentItem] = await db
      .update(content)
      .set({ 
        ...updateContent, 
        updatedAt: new Date(),
        ...(updateContent.status === 'published' ? { publishedDate: new Date() } : {})
      })
      .where(eq(content.id, id))
      .returning();
    return contentItem || undefined;
  }

  async deleteContent(id: number): Promise<boolean> {
    const result = await db.delete(content).where(eq(content.id, id));
    return result.rowCount > 0;
  }

  // Onboarding Flows
  async getOnboardingFlow(id: number): Promise<OnboardingFlow | undefined> {
    const [flow] = await db.select().from(onboardingFlows).where(eq(onboardingFlows.id, id));
    return flow || undefined;
  }

  async getOnboardingFlowByClient(clientId: number): Promise<OnboardingFlow | undefined> {
    const [flow] = await db.select().from(onboardingFlows).where(eq(onboardingFlows.clientId, clientId));
    return flow || undefined;
  }

  async getAllOnboardingFlows(): Promise<OnboardingFlow[]> {
    return await db.select().from(onboardingFlows).orderBy(desc(onboardingFlows.createdAt));
  }

  async createOnboardingFlow(insertFlow: InsertOnboardingFlow): Promise<OnboardingFlow> {
    const [flow] = await db.insert(onboardingFlows).values(insertFlow).returning();
    return flow;
  }

  async updateOnboardingFlow(id: number, updateFlow: Partial<InsertOnboardingFlow>): Promise<OnboardingFlow | undefined> {
    const [flow] = await db
      .update(onboardingFlows)
      .set({ 
        ...updateFlow, 
        updatedAt: new Date(),
        ...(updateFlow.status === 'completed' ? { completedDate: new Date() } : {})
      })
      .where(eq(onboardingFlows.id, id))
      .returning();
    return flow || undefined;
  }

  // Offboarding Flows
  async getOffboardingFlow(id: number): Promise<OffboardingFlow | undefined> {
    const [flow] = await db.select().from(offboardingFlows).where(eq(offboardingFlows.id, id));
    return flow || undefined;
  }

  async getOffboardingFlowByClient(clientId: number): Promise<OffboardingFlow | undefined> {
    const [flow] = await db.select().from(offboardingFlows).where(eq(offboardingFlows.clientId, clientId));
    return flow || undefined;
  }

  async getAllOffboardingFlows(): Promise<OffboardingFlow[]> {
    return await db.select().from(offboardingFlows).orderBy(desc(offboardingFlows.createdAt));
  }

  async createOffboardingFlow(insertFlow: InsertOffboardingFlow): Promise<OffboardingFlow> {
    const [flow] = await db.insert(offboardingFlows).values(insertFlow).returning();
    return flow;
  }

  async updateOffboardingFlow(id: number, updateFlow: Partial<InsertOffboardingFlow>): Promise<OffboardingFlow | undefined> {
    const [flow] = await db
      .update(offboardingFlows)
      .set({ 
        ...updateFlow, 
        updatedAt: new Date(),
        ...(updateFlow.status === 'completed' ? { completedDate: new Date() } : {})
      })
      .where(eq(offboardingFlows.id, id))
      .returning();
    return flow || undefined;
  }

  // Feedback
  async getFeedback(id: number): Promise<Feedback | undefined> {
    const [feedbackItem] = await db.select().from(feedback).where(eq(feedback.id, id));
    return feedbackItem || undefined;
  }

  async getFeedbackByClient(clientId: number): Promise<Feedback[]> {
    return await db.select().from(feedback).where(eq(feedback.clientId, clientId));
  }

  async getFeedbackByProject(projectId: number): Promise<Feedback[]> {
    return await db.select().from(feedback).where(eq(feedback.projectId, projectId));
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const [feedbackItem] = await db.insert(feedback).values(insertFeedback).returning();
    return feedbackItem;
  }

  async updateFeedback(id: number, updateFeedback: Partial<InsertFeedback>): Promise<Feedback | undefined> {
    const [feedbackItem] = await db
      .update(feedback)
      .set({ 
        ...updateFeedback, 
        updatedAt: new Date(),
        ...(updateFeedback.response ? { respondedAt: new Date() } : {})
      })
      .where(eq(feedback.id, id))
      .returning();
    return feedbackItem || undefined;
  }

  // Dashboard Analytics
  async getDashboardStats() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get current month stats
    const [revenueResult] = await db
      .select({ 
        totalRevenue: sql<number>`COALESCE(SUM(${invoices.total}), 0)::numeric` 
      })
      .from(invoices)
      .where(eq(invoices.status, 'paid'));

    const [clientsResult] = await db
      .select({ 
        activeClients: count() 
      })
      .from(clients)
      .where(eq(clients.status, 'active'));

    const [tasksResult] = await db
      .select({ 
        tasksCompleted: count() 
      })
      .from(tasks)
      .where(and(
        eq(tasks.status, 'completed'),
        gte(tasks.completedAt, thirtyDaysAgo)
      ));

    // Get previous month stats for growth calculation
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const [prevRevenueResult] = await db
      .select({ 
        totalRevenue: sql<number>`COALESCE(SUM(${invoices.total}), 0)::numeric` 
      })
      .from(invoices)
      .where(and(
        eq(invoices.status, 'paid'),
        gte(invoices.paidDate, sixtyDaysAgo),
        lte(invoices.paidDate, thirtyDaysAgo)
      ));

    const [prevClientsResult] = await db
      .select({ 
        activeClients: count() 
      })
      .from(clients)
      .where(and(
        eq(clients.status, 'active'),
        gte(clients.createdAt, sixtyDaysAgo),
        lte(clients.createdAt, thirtyDaysAgo)
      ));

    const [prevTasksResult] = await db
      .select({ 
        tasksCompleted: count() 
      })
      .from(tasks)
      .where(and(
        eq(tasks.status, 'completed'),
        gte(tasks.completedAt, sixtyDaysAgo),
        lte(tasks.completedAt, thirtyDaysAgo)
      ));

    const totalRevenue = Number(revenueResult?.totalRevenue || 0);
    const activeClients = Number(clientsResult?.activeClients || 0);
    const tasksCompleted = Number(tasksResult?.tasksCompleted || 0);
    
    const prevRevenue = Number(prevRevenueResult?.totalRevenue || 0);
    const prevClients = Number(prevClientsResult?.activeClients || 0);
    const prevTasks = Number(prevTasksResult?.tasksCompleted || 0);

    const revenueGrowth = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;
    const clientGrowth = prevClients > 0 ? ((activeClients - prevClients) / prevClients) * 100 : 0;
    const taskGrowth = prevTasks > 0 ? ((tasksCompleted - prevTasks) / prevTasks) * 100 : 0;

    return {
      totalRevenue,
      activeClients,
      tasksCompleted,
      teamUtilization: 85, // This would need more complex calculation based on actual time tracking
      revenueGrowth,
      clientGrowth,
      taskGrowth,
    };
  }

  async getClientHealthDistribution() {
    const [healthyResult] = await db
      .select({ count: count() })
      .from(clients)
      .where(eq(clients.healthScore, 'healthy'));

    const [atRiskResult] = await db
      .select({ count: count() })
      .from(clients)
      .where(eq(clients.healthScore, 'at_risk'));

    const [criticalResult] = await db
      .select({ count: count() })
      .from(clients)
      .where(eq(clients.healthScore, 'critical'));

    return {
      healthy: Number(healthyResult?.count || 0),
      atRisk: Number(atRiskResult?.count || 0),
      critical: Number(criticalResult?.count || 0),
    };
  }

  async getRevenueByMonth(months: number = 12) {
    try {
      // For now, return empty months data since there are no paid invoices yet
      const fallbackData = [];
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        fallbackData.push({
          month: date.toISOString().slice(0, 7),
          revenue: 0
        });
      }
      return fallbackData;
    } catch (error) {
      console.error('Error fetching revenue by month:', error);
      // Return empty array with last 12 months as fallback
      const fallbackData = [];
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        fallbackData.push({
          month: date.toISOString().slice(0, 7),
          revenue: 0
        });
      }
      return fallbackData;
    }
  }
}

export const storage = new DatabaseStorage();
