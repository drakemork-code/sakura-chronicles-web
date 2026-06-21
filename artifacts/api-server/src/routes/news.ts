import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, newsTable } from "@workspace/db";
import {
  ListNewsResponse,
  ListNewsQueryParams,
  GetNewsArticleParams,
  GetNewsArticleResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/news", async (req, res): Promise<void> => {
  const query = ListNewsQueryParams.safeParse(req.query);
  const limit = query.success && query.data.limit ? Number(query.data.limit) : 50;
  const category = query.success ? query.data.category : undefined;

  let dbQuery = db.select().from(newsTable).orderBy(newsTable.publishedAt);

  const rows = await db
    .select()
    .from(newsTable)
    .orderBy(newsTable.publishedAt)
    .limit(limit);

  const filtered = category ? rows.filter((r) => r.category === category) : rows;

  const result = filtered.reverse().map((r) => ({
    id: r.id,
    title: r.title,
    summary: r.summary,
    content: r.content,
    author: r.author,
    publishedAt: r.publishedAt.toISOString(),
    category: r.category,
    imageUrl: r.imageUrl,
    featured: r.featured,
  }));

  res.json(ListNewsResponse.parse(result));
});

router.get("/news/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetNewsArticleParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [row] = await db
    .select()
    .from(newsTable)
    .where(eq(newsTable.id, params.data.id));

  if (!row) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.json(
    GetNewsArticleResponse.parse({
      id: row.id,
      title: row.title,
      summary: row.summary,
      content: row.content,
      author: row.author,
      publishedAt: row.publishedAt.toISOString(),
      category: row.category,
      imageUrl: row.imageUrl,
      featured: row.featured,
    })
  );
});

export default router;
