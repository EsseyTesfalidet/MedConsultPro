import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const symptomAnalyses = pgTable("symptom_analyses", {
  id: serial("id").primaryKey(),
  ageRange: text("age_range").notNull(),
  gender: text("gender").notNull(),
  primarySymptoms: text("primary_symptoms").notNull(),
  duration: text("duration").notNull(),
  painLevel: integer("pain_level").notNull(),
  additionalSymptoms: text("additional_symptoms").array(),
  medicalHistory: text("medical_history"),
  analysis: jsonb("analysis"),
  sessionId: text("session_id"), // Anonymous session tracking only
  createdAt: timestamp("created_at").defaultNow(),
});

export const healthTopics = pgTable("health_topics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  author: text("author"),
  readTime: text("read_time"),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  consentGiven: boolean("consent_given").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSymptomAnalysisSchema = createInsertSchema(symptomAnalyses).omit({
  id: true,
  analysis: true,
  createdAt: true,
});

export const insertHealthTopicSchema = createInsertSchema(healthTopics).omit({
  id: true,
  publishedAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertSymptomAnalysis = z.infer<typeof insertSymptomAnalysisSchema>;
export type SymptomAnalysis = typeof symptomAnalyses.$inferSelect;

export type InsertHealthTopic = z.infer<typeof insertHealthTopicSchema>;
export type HealthTopic = typeof healthTopics.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
