import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSymptomAnalysisSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Symptom analysis endpoint
  app.post("/api/symptom-analysis", async (req, res) => {
    try {
      const validatedData = insertSymptomAnalysisSchema.parse(req.body);
      const analysis = await storage.createSymptomAnalysis(validatedData);
      res.json(analysis);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to analyze symptoms" 
        });
      }
    }
  });

  // Get symptom analysis by ID
  app.get("/api/symptom-analysis/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid analysis ID" });
      }
      
      const analysis = await storage.getSymptomAnalysis(id);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve analysis" });
    }
  });

  // Get all health topics
  app.get("/api/health-topics", async (req, res) => {
    try {
      const topics = await storage.getHealthTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve health topics" });
    }
  });

  // Get health topics by category
  app.get("/api/health-topics/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const topics = await storage.getHealthTopicsByCategory(category);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve health topics by category" });
    }
  });

  // Search health topics
  app.get("/api/health-topics/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const topics = await storage.searchHealthTopics(query);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to search health topics" });
    }
  });

  // Submit contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ 
        success: true, 
        message: "Your message has been submitted successfully. We'll get back to you within 24 hours.",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to submit contact message" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
