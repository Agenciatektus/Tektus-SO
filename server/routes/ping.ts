import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
res.status(200).json({ message: "pong 🟢" });

});

export default router;
