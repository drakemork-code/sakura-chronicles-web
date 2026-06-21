import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import {
  RegisterBody,
  LoginBody,
  RequestPasswordRecoveryBody,
} from "@workspace/api-zod";
import crypto from "crypto";

const router: IRouter = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { username, email, password } = parsed.data;

  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existing.length > 0) {
    res.status(400).json({ error: "El correo electrónico ya está registrado" });
    return;
  }

  const [user] = await db
    .insert(usersTable)
    .values({ username, email, passwordHash: hashPassword(password) })
    .returning();

  const token = crypto.randomBytes(32).toString("hex");
  res.status(201).json({ token, username: user.username });
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email, password } = parsed.data;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (!user || user.passwordHash !== hashPassword(password)) {
    res.status(401).json({ error: "Credenciales incorrectas" });
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  res.json({ token, username: user.username });
});

router.post("/auth/recover", async (req, res): Promise<void> => {
  const parsed = RequestPasswordRecoveryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  res.json({
    message:
      "Si existe una cuenta con ese correo, recibirás un enlace de recuperación en breve.",
  });
});

export default router;
