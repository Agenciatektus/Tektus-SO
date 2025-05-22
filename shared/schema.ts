import { pgTable, text, serial, integer, boolean, timestamp, decimal, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const userRoleEnum = pgEnum("user_role", ["admin", "operations", "sales", "finance", "content", "traffic", "hr"]);
export const taskStatusEnum = pgEnum("task_status", ["pending", "in_progress", "completed", "cancelled"]);
export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high", "urgent"]);
export const clientStatusEnum = pgEnum("client_status", ["active", "inactive", "onboarding", "offboarding"]);
export const clientHealthEnum = pgEnum("client_health", ["healthy", "at_risk", "critical"]);
export const invoiceStatusEnum = pgEnum("invoice_status", ["draft", "sent", "paid", "overdue", "cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "completed", "failed"]);
export const contentStatusEnum = pgEnum("content_status", ["draft", "review", "approved", "published"]);

// Sales Pipeline Enums
export const leadStageEnum = pgEnum("lead_stage", ["new_lead", "contact_made", "meeting_scheduled", "proposal_sent", "negotiation", "won", "lost"]);
export const leadSourceEnum = pgEnum("lead_source", ["website", "referral", "social_media", "email_marketing", "cold_outreach", "advertising", "networking", "other"]);
export const industryEnum = pgEnum("industry", ["ecommerce", "saas", "healthcare", "finance", "education", "real_estate", "manufacturing", "consulting", "agency", "other"]);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: userRoleEnum("role").notNull().default("operations"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Clients table
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company").notNull(),
  industry: text("industry"),
  status: clientStatusEnum("status").notNull().default("active"),
  healthScore: clientHealthEnum("health_score").notNull().default("healthy"),
  monthlyValue: decimal("monthly_value", { precision: 10, scale: 2 }),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  notes: text("notes"),
  assignedUserId: integer("assigned_user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  managerId: integer("manager_id").references(() => users.id),
  status: taskStatusEnum("status").notNull().default("pending"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  budget: decimal("budget", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tasks table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  projectId: integer("project_id").references(() => projects.id),
  clientId: integer("client_id").references(() => clients.id),
  assigneeId: integer("assignee_id").references(() => users.id),
  creatorId: integer("creator_id").references(() => users.id).notNull(),
  status: taskStatusEnum("status").notNull().default("pending"),
  priority: taskPriorityEnum("priority").notNull().default("medium"),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  estimatedHours: integer("estimated_hours"),
  actualHours: integer("actual_hours"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Invoices table
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }).default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: invoiceStatusEnum("status").notNull().default("draft"),
  issuedDate: timestamp("issued_date").defaultNow().notNull(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  description: text("description"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Payments table
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").references(() => invoices.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: paymentStatusEnum("status").notNull().default("pending"),
  paymentMethod: text("payment_method"),
  transactionId: text("transaction_id"),
  paidDate: timestamp("paid_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Content table
export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  clientId: integer("client_id").references(() => clients.id),
  authorId: integer("author_id").references(() => users.id).notNull(),
  status: contentStatusEnum("status").notNull().default("draft"),
  platform: text("platform"), // social media platform, website, etc.
  scheduledDate: timestamp("scheduled_date"),
  publishedDate: timestamp("published_date"),
  tags: text("tags"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Onboarding Flows table
export const onboardingFlows = pgTable("onboarding_flows", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  currentStep: integer("current_step").notNull().default(1),
  totalSteps: integer("total_steps").notNull().default(5),
  status: taskStatusEnum("status").notNull().default("pending"),
  assignedUserId: integer("assigned_user_id").references(() => users.id),
  startDate: timestamp("start_date").defaultNow(),
  completedDate: timestamp("completed_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Offboarding Flows table
export const offboardingFlows = pgTable("offboarding_flows", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  currentStep: integer("current_step").notNull().default(1),
  totalSteps: integer("total_steps").notNull().default(3),
  status: taskStatusEnum("status").notNull().default("pending"),
  assignedUserId: integer("assigned_user_id").references(() => users.id),
  reason: text("reason"),
  startDate: timestamp("start_date").defaultNow(),
  completedDate: timestamp("completed_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Feedback table
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  projectId: integer("project_id").references(() => projects.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  category: text("category"), // service, communication, quality, etc.
  isPublic: boolean("is_public").notNull().default(false),
  respondedAt: timestamp("responded_at"),
  response: text("response"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Sales Leads table
export const salesLeads = pgTable("sales_leads", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  position: text("position"),
  stage: leadStageEnum("stage").notNull().default("new_lead"),
  source: leadSourceEnum("source").notNull().default("other"),
  industry: industryEnum("industry").notNull().default("other"),
  dealValue: decimal("deal_value", { precision: 10, scale: 2 }),
  estimatedCloseDate: timestamp("estimated_close_date"),
  actualCloseDate: timestamp("actual_close_date"),
  probability: integer("probability").default(10), // percentage 0-100
  assignedUserId: integer("assigned_user_id").references(() => users.id).notNull(),
  notes: text("notes"),
  lastContactDate: timestamp("last_contact_date"),
  nextFollowUpDate: timestamp("next_follow_up_date"),
  lostReason: text("lost_reason"), // only if stage is 'lost'
  // Industry-specific fields (JSON)
  industryFields: text("industry_fields"), // JSON string for dynamic fields
  // Stagnation tracking
  stageChangedAt: timestamp("stage_changed_at").defaultNow().notNull(),
  isStagnant: boolean("is_stagnant").default(false),
  stagnantSince: timestamp("stagnant_since"),
  // Google Calendar integration
  calendarEventId: text("calendar_event_id"),
  meetingLink: text("meeting_link"),
  meetingDate: timestamp("meeting_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Sales Activities table (track interactions with leads)
export const salesActivities = pgTable("sales_activities", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => salesLeads.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(), // call, email, meeting, proposal, note
  subject: text("subject").notNull(),
  description: text("description"),
  scheduledDate: timestamp("scheduled_date"),
  completedDate: timestamp("completed_date"),
  outcome: text("outcome"), // successful, no_answer, rescheduled, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  assignedClients: many(clients),
  managedProjects: many(projects),
  createdTasks: many(tasks, { relationName: "creator" }),
  assignedTasks: many(tasks, { relationName: "assignee" }),
  content: many(content),
  onboardingFlows: many(onboardingFlows),
  offboardingFlows: many(offboardingFlows),
  assignedLeads: many(salesLeads),
  salesActivities: many(salesActivities),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
  assignedUser: one(users, {
    fields: [clients.assignedUserId],
    references: [users.id],
  }),
  projects: many(projects),
  tasks: many(tasks),
  invoices: many(invoices),
  content: many(content),
  onboardingFlow: one(onboardingFlows),
  offboardingFlow: one(offboardingFlows),
  feedback: many(feedback),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id],
  }),
  manager: one(users, {
    fields: [projects.managerId],
    references: [users.id],
  }),
  tasks: many(tasks),
  feedback: many(feedback),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  client: one(clients, {
    fields: [tasks.clientId],
    references: [clients.id],
  }),
  assignee: one(users, {
    fields: [tasks.assigneeId],
    references: [users.id],
    relationName: "assignee",
  }),
  creator: one(users, {
    fields: [tasks.creatorId],
    references: [users.id],
    relationName: "creator",
  }),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  client: one(clients, {
    fields: [invoices.clientId],
    references: [clients.id],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  invoice: one(invoices, {
    fields: [payments.invoiceId],
    references: [invoices.id],
  }),
}));

export const contentRelations = relations(content, ({ one }) => ({
  client: one(clients, {
    fields: [content.clientId],
    references: [clients.id],
  }),
  author: one(users, {
    fields: [content.authorId],
    references: [users.id],
  }),
}));

export const onboardingFlowsRelations = relations(onboardingFlows, ({ one }) => ({
  client: one(clients, {
    fields: [onboardingFlows.clientId],
    references: [clients.id],
  }),
  assignedUser: one(users, {
    fields: [onboardingFlows.assignedUserId],
    references: [users.id],
  }),
}));

export const offboardingFlowsRelations = relations(offboardingFlows, ({ one }) => ({
  client: one(clients, {
    fields: [offboardingFlows.clientId],
    references: [clients.id],
  }),
  assignedUser: one(users, {
    fields: [offboardingFlows.assignedUserId],
    references: [users.id],
  }),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  client: one(clients, {
    fields: [feedback.clientId],
    references: [clients.id],
  }),
  project: one(projects, {
    fields: [feedback.projectId],
    references: [projects.id],
  }),
}));

export const salesLeadsRelations = relations(salesLeads, ({ one, many }) => ({
  assignedUser: one(users, {
    fields: [salesLeads.assignedUserId],
    references: [users.id],
  }),
  activities: many(salesActivities),
}));

export const salesActivitiesRelations = relations(salesActivities, ({ one }) => ({
  lead: one(salesLeads, {
    fields: [salesActivities.leadId],
    references: [salesLeads.id],
  }),
  user: one(users, {
    fields: [salesActivities.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  paidDate: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedDate: true,
});

export const insertOnboardingFlowSchema = createInsertSchema(onboardingFlows).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedDate: true,
});

export const insertOffboardingFlowSchema = createInsertSchema(offboardingFlows).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedDate: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  respondedAt: true,
});

export const insertSalesLeadSchema = createInsertSchema(salesLeads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  actualCloseDate: true,
});

export const insertSalesActivitySchema = createInsertSchema(salesActivities).omit({
  id: true,
  createdAt: true,
  completedDate: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Content = typeof content.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type OnboardingFlow = typeof onboardingFlows.$inferSelect;
export type InsertOnboardingFlow = z.infer<typeof insertOnboardingFlowSchema>;
export type OffboardingFlow = typeof offboardingFlows.$inferSelect;
export type InsertOffboardingFlow = z.infer<typeof insertOffboardingFlowSchema>;
export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type SalesLead = typeof salesLeads.$inferSelect;
export type InsertSalesLead = z.infer<typeof insertSalesLeadSchema>;
export type SalesActivity = typeof salesActivities.$inferSelect;
export type InsertSalesActivity = z.infer<typeof insertSalesActivitySchema>;
