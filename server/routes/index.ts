import { Express } from "express";
import pingRouter from "./ping";
import clientsRouter from "./clients";
import { setupAuth } from "../auth"; // 👈 Importa o setup de autenticação

export async function registerRoutes(app: Express) {
  app.use("/api/ping", pingRouter);
  app.use("/api/clients", clientsRouter);

  // 👇 Setup da autenticação, que inclui /api/register, /api/login etc
  setupAuth(app);
}
