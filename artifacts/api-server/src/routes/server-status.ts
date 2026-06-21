import { Router, type IRouter } from "express";
import { GetServerStatusResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/server-status", async (req, res): Promise<void> => {
  const status = GetServerStatusResponse.parse({
    online: true,
    players: 1247,
    maxPlayers: 5000,
    ping: 23,
    uptime: "14d 6h 32m",
    region: "América Latina",
    lastUpdated: new Date().toISOString(),
  });
  res.json(status);
});

export default router;
