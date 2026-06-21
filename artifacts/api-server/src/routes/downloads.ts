import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, releasesTable } from "@workspace/db";
import {
  ListDownloadsResponse,
  GetLatestReleaseResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function mapRelease(r: typeof releasesTable.$inferSelect) {
  return {
    id: r.id,
    version: r.version,
    releasedAt: r.releasedAt.toISOString(),
    isLatest: r.isLatest,
    changelog: r.changelog ?? [],
    downloadUrlAndroid: r.downloadUrlAndroid ?? undefined,
    downloadUrlWindows: r.downloadUrlWindows ?? undefined,
    downloadUrlIos: r.downloadUrlIos ?? undefined,
    sizeAndroid: r.sizeAndroid ?? undefined,
    sizeWindows: r.sizeWindows ?? undefined,
    sizeIos: r.sizeIos ?? undefined,
  };
}

router.get("/downloads", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(releasesTable)
    .orderBy(desc(releasesTable.releasedAt));

  res.json(ListDownloadsResponse.parse(rows.map(mapRelease)));
});

router.get("/downloads/latest", async (req, res): Promise<void> => {
  const [row] = await db
    .select()
    .from(releasesTable)
    .where(eq(releasesTable.isLatest, true))
    .limit(1);

  if (!row) {
    const [fallback] = await db
      .select()
      .from(releasesTable)
      .orderBy(desc(releasesTable.releasedAt))
      .limit(1);

    if (!fallback) {
      res.status(404).json({ error: "No releases found" });
      return;
    }

    res.json(GetLatestReleaseResponse.parse(mapRelease(fallback)));
    return;
  }

  res.json(GetLatestReleaseResponse.parse(mapRelease(row)));
});

export default router;
