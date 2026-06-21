import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const wikiTable = pgTable("wiki", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  lore: text("lore"),
  attributes: text("attributes").default("{}"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertWikiSchema = createInsertSchema(wikiTable).omit({ id: true, createdAt: true });
export type InsertWiki = z.infer<typeof insertWikiSchema>;
export type Wiki = typeof wikiTable.$inferSelect;
