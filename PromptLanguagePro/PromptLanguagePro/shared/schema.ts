import { pgTable, text, serial, varchar, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const examplePrompts = pgTable("example_prompts", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  enhancedText: text("enhanced_text").notNull(),
  language: text("language").notNull(),
  tone: text("tone"),
  role: text("role"),
});

export const insertExamplePromptSchema = createInsertSchema(examplePrompts).pick({
  originalText: true,
  enhancedText: true,
  language: true,
  tone: true,
  role: true,
});

export type InsertExamplePrompt = z.infer<typeof insertExamplePromptSchema>;
export type ExamplePrompt = typeof examplePrompts.$inferSelect;

export const promptSchema = z.object({
  userInput: z.string().min(1, "Input is required"),
  tone: z.string().optional(),
  role: z.string().optional(),
});

export type PromptRequest = z.infer<typeof promptSchema>;

export const enhancedPromptSchema = z.object({
  enhancedPrompt: z.string(),
  detectedLanguage: z.string(),
});

export type EnhancedPromptResponse = z.infer<typeof enhancedPromptSchema>;
