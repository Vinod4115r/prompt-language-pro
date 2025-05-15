import { users, examplePrompts, type User, type UpsertUser, type ExamplePrompt, type InsertExamplePrompt } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Modified interface to include example prompts CRUD operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Example prompts operations
  getExamplePrompts(): Promise<ExamplePrompt[]>;
  getExamplePromptById(id: number): Promise<ExamplePrompt | undefined>;
  createExamplePrompt(examplePrompt: InsertExamplePrompt): Promise<ExamplePrompt>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
  
  // Example prompts operations
  async getExamplePrompts(): Promise<ExamplePrompt[]> {
    return db.select().from(examplePrompts);
  }
  
  async getExamplePromptById(id: number): Promise<ExamplePrompt | undefined> {
    const [examplePrompt] = await db.select().from(examplePrompts).where(eq(examplePrompts.id, id));
    return examplePrompt || undefined;
  }
  
  async createExamplePrompt(insertExamplePrompt: InsertExamplePrompt): Promise<ExamplePrompt> {
    const [examplePrompt] = await db
      .insert(examplePrompts)
      .values(insertExamplePrompt)
      .returning();
    return examplePrompt;
  }
}

export const storage = new DatabaseStorage();
