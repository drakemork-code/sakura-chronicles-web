import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const releasesTable = pgTable("releases", {
  id: serial("id").primaryKey(),
  version: text("version").notNull(),
  releasedAt: timestamp("released_at", { withTimezone: true }).notNull().defaultNow(),
  isLatest: boolean("is_latest").notNull().default(false),
  changelog: text("changelog").array().notNull().default([]),
  downloadUrlAndroid: text("download_url_android"),
  downloadUrlWindows: text("download_url_windows"),
  downloadUrlIos: text("download_url_ios"),
  sizeAndroid: text("size_android"),
  sizeWindows: text("size_windows"),
  sizeIos: text("size_ios"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertReleaseSchema = createInsertSchema(releasesTable).omit({ id: true, createdAt: true });
export type InsertRelease = z.infer<typeof insertReleaseSchema>;
export type Release = typeof releasesTable.$inferSelect;
