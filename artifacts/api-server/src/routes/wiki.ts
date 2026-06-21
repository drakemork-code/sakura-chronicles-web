import { Router, type IRouter } from "express";
import { and, eq } from "drizzle-orm";
import { db, wikiTable } from "@workspace/db";
import {
  ListWikiEntriesParams,
  ListWikiEntriesResponse,
  GetWikiEntryParams,
  GetWikiEntryResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const CATEGORY_MAP: Record<string, string> = {
  classes: "classes",
  weapons: "weapons",
  professions: "professions",
  bosses: "bosses",
  dungeons: "dungeons",
};

function mapWikiEntry(r: typeof wikiTable.$inferSelect) {
  let attributes: Record<string, string> = {};
  try {
    if (r.attributes) attributes = JSON.parse(r.attributes);
  } catch {}
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    category: r.category,
    description: r.description,
    imageUrl: r.imageUrl,
    lore: r.lore ?? undefined,
    attributes,
  };
}

router.get("/wiki/:category", async (req, res): Promise<void> => {
  const rawCat = Array.isArray(req.params.category)
    ? req.params.category[0]
    : req.params.category;

  const params = ListWikiEntriesParams.safeParse({ category: rawCat });
  if (!params.success) {
    res.status(400).json({ error: "Invalid category" });
    return;
  }

  const dbCategory = CATEGORY_MAP[params.data.category];
  const rows = await db
    .select()
    .from(wikiTable)
    .where(eq(wikiTable.category, dbCategory));

  res.json(ListWikiEntriesResponse.parse(rows.map(mapWikiEntry)));
});

router.get("/wiki/:category/:slug", async (req, res): Promise<void> => {
  const rawCat = Array.isArray(req.params.category)
    ? req.params.category[0]
    : req.params.category;
  const rawSlug = Array.isArray(req.params.slug)
    ? req.params.slug[0]
    : req.params.slug;

  const params = GetWikiEntryParams.safeParse({ category: rawCat, slug: rawSlug });
  if (!params.success) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }

  const [row] = await db
    .select()
    .from(wikiTable)
    .where(
      and(
        eq(wikiTable.category, params.data.category),
        eq(wikiTable.slug, params.data.slug)
      )
    );

  if (!row) {
    res.status(404).json({ error: "Wiki entry not found" });
    return;
  }

  res.json(GetWikiEntryResponse.parse(mapWikiEntry(row)));
});

export default router;
