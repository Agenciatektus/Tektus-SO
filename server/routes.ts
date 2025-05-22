import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertClientSchema, insertProjectSchema, insertTaskSchema, 
  insertInvoiceSchema, insertPaymentSchema, insertContentSchema,
  insertOnboardingFlowSchema, insertOffboardingFlowSchema, insertFeedbackSchema
} from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Setup authentication routes
  setupAuth(app);

  // Middleware to check authentication
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };

  // Dashboard Analytics
  app.get("/api/dashboard/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  app.get("/api/dashboard/client-health", requireAuth, async (req, res) => {
    try {
      const health = await storage.getClientHealthDistribution();
      res.json(health);
    } catch (error) {
      console.error("Error fetching client health:", error);
      res.status(500).json({ message: "Failed to fetch client health data" });
    }
  });

  app.get("/api/dashboard/revenue-trend", requireAuth, async (req, res) => {
    try {
      const months = parseInt(req.query.months as string) || 12;
      const revenue = await storage.getRevenueByMonth(months);
      res.json(revenue);
    } catch (error) {
      console.error("Error fetching revenue trend:", error);
      res.status(500).json({ message: "Failed to fetch revenue trend" });
    }
  });

  // Clients CRUD
  app.get("/api/clients", requireAuth, async (req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  app.get("/api/clients/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const client = await storage.getClient(id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ message: "Failed to fetch client" });
    }
  });

  app.post("/api/clients", requireAuth, async (req, res) => {
    try {
      const clientData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(clientData);
      res.status(201).json(client);
    } catch (error) {
      console.error("Error creating client:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid client data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create client" });
    }
  });

  app.put("/api/clients/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const clientData = insertClientSchema.partial().parse(req.body);
      const client = await storage.updateClient(id, clientData);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      console.error("Error updating client:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid client data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update client" });
    }
  });

  app.delete("/api/clients/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteClient(id);
      if (!success) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ message: "Failed to delete client" });
    }
  });

  // Projects CRUD
  app.get("/api/projects", requireAuth, async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/client/:clientId", requireAuth, async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const projects = await storage.getProjectsByClient(clientId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching client projects:", error);
      res.status(500).json({ message: "Failed to fetch client projects" });
    }
  });

  app.post("/api/projects", requireAuth, async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Tasks CRUD
  app.get("/api/tasks", requireAuth, async (req, res) => {
    try {
      const tasks = await storage.getAllTasks();
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.get("/api/tasks/recent", requireAuth, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const tasks = await storage.getRecentTasks(limit);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching recent tasks:", error);
      res.status(500).json({ message: "Failed to fetch recent tasks" });
    }
  });

  app.get("/api/tasks/upcoming", requireAuth, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const tasks = await storage.getUpcomingTasks(limit);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching upcoming tasks:", error);
      res.status(500).json({ message: "Failed to fetch upcoming tasks" });
    }
  });

  app.post("/api/tasks", requireAuth, async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse({
        ...req.body,
        creatorId: req.user.id
      });
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  app.put("/api/tasks/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const taskData = insertTaskSchema.partial().parse(req.body);
      const task = await storage.updateTask(id, taskData);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  // Invoices CRUD
  app.get("/api/invoices", requireAuth, async (req, res) => {
    try {
      const invoices = await storage.getAllInvoices();
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  app.post("/api/invoices", requireAuth, async (req, res) => {
    try {
      const invoiceData = insertInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(invoiceData);
      res.status(201).json(invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid invoice data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });

  // Content CRUD
  app.get("/api/content", requireAuth, async (req, res) => {
    try {
      const content = await storage.getAllContent();
      res.json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.post("/api/content", requireAuth, async (req, res) => {
    try {
      const contentData = insertContentSchema.parse({
        ...req.body,
        authorId: req.user.id
      });
      const content = await storage.createContent(contentData);
      res.status(201).json(content);
    } catch (error) {
      console.error("Error creating content:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid content data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create content" });
    }
  });

  // Onboarding Flows
  app.get("/api/onboarding", requireAuth, async (req, res) => {
    try {
      const flows = await storage.getAllOnboardingFlows();
      res.json(flows);
    } catch (error) {
      console.error("Error fetching onboarding flows:", error);
      res.status(500).json({ message: "Failed to fetch onboarding flows" });
    }
  });

  app.post("/api/onboarding", requireAuth, async (req, res) => {
    try {
      const flowData = insertOnboardingFlowSchema.parse(req.body);
      const flow = await storage.createOnboardingFlow(flowData);
      res.status(201).json(flow);
    } catch (error) {
      console.error("Error creating onboarding flow:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid onboarding flow data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create onboarding flow" });
    }
  });

  // Offboarding Flows
  app.get("/api/offboarding", requireAuth, async (req, res) => {
    try {
      const flows = await storage.getAllOffboardingFlows();
      res.json(flows);
    } catch (error) {
      console.error("Error fetching offboarding flows:", error);
      res.status(500).json({ message: "Failed to fetch offboarding flows" });
    }
  });

  app.post("/api/offboarding", requireAuth, async (req, res) => {
    try {
      const flowData = insertOffboardingFlowSchema.parse(req.body);
      const flow = await storage.createOffboardingFlow(flowData);
      res.status(201).json(flow);
    } catch (error) {
      console.error("Error creating offboarding flow:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid offboarding flow data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create offboarding flow" });
    }
  });

  // Users Management (Admin only)
  app.get("/api/users", requireAuth, async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
