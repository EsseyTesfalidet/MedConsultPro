import { 
  users, 
  symptomAnalyses, 
  healthTopics, 
  contactMessages,
  type User, 
  type InsertUser,
  type SymptomAnalysis,
  type InsertSymptomAnalysis,
  type HealthTopic,
  type InsertHealthTopic,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, like, or } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Symptom analysis methods
  createSymptomAnalysis(analysis: InsertSymptomAnalysis): Promise<SymptomAnalysis>;
  getSymptomAnalysis(id: number): Promise<SymptomAnalysis | undefined>;
  
  // Health topics methods
  getHealthTopics(): Promise<HealthTopic[]>;
  getHealthTopicsByCategory(category: string): Promise<HealthTopic[]>;
  searchHealthTopics(query: string): Promise<HealthTopic[]>;
  createHealthTopic(topic: InsertHealthTopic): Promise<HealthTopic>;
  
  // Contact messages methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private symptomAnalyses: Map<number, SymptomAnalysis>;
  private healthTopics: Map<number, HealthTopic>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentAnalysisId: number;
  private currentTopicId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.symptomAnalyses = new Map();
    this.healthTopics = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentAnalysisId = 1;
    this.currentTopicId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample health topics
    this.initializeHealthTopics();
  }

  private initializeHealthTopics() {
    const sampleTopics: InsertHealthTopic[] = [
      {
        title: "Heart Disease Prevention",
        category: "Cardiovascular Health",
        description: "Learn about maintaining cardiovascular health, risk factors, and prevention strategies for heart disease.",
        content: "Cardiovascular disease remains the leading cause of death globally. Understanding prevention strategies is crucial for maintaining heart health. Key factors include regular exercise, a balanced diet low in saturated fats, maintaining healthy weight, avoiding smoking, and managing stress. Regular check-ups can help monitor blood pressure, cholesterol levels, and other cardiovascular risk factors.",
        imageUrl: "https://pixabay.com/get/g1188980cbbdf067a861563dc0ef54883699fbdb3e379cb07a4e74de001536e0262f75c424e6d1eb3b9d3af3b04eaea469041345a3fa40d2d848a4e19375b5db3_1280.jpg",
        author: "Dr. Sarah Johnson",
        readTime: "5 min read"
      },
      {
        title: "Managing Diabetes",
        category: "Diabetes Care",
        description: "Comprehensive guide to diabetes management, monitoring blood sugar, and lifestyle adjustments.",
        content: "Diabetes management involves a comprehensive approach including blood sugar monitoring, medication adherence, dietary planning, and regular exercise. Patients should work closely with healthcare providers to develop personalized management plans. Key components include understanding carbohydrate counting, recognizing symptoms of high and low blood sugar, and maintaining regular medical appointments.",
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        author: "Dr. Michael Chen",
        readTime: "7 min read"
      },
      {
        title: "Mental Wellness",
        category: "Mental Health",
        description: "Understanding mental health, stress management, and maintaining emotional well-being.",
        content: "Mental wellness is equally important as physical health. Strategies for maintaining good mental health include regular exercise, adequate sleep, stress management techniques, social connections, and seeking professional help when needed. Recognizing early signs of mental health issues and addressing them promptly can prevent more serious conditions.",
        imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        author: "Dr. Emily Rodriguez",
        readTime: "6 min read"
      },
      {
        title: "Healthy Nutrition",
        category: "Nutrition",
        description: "Essential nutrition guidelines, balanced diet tips, and healthy eating habits for optimal health.",
        content: "A balanced diet is fundamental to good health. Focus on whole foods including fruits, vegetables, lean proteins, whole grains, and healthy fats. Limit processed foods, added sugars, and excessive sodium. Portion control and regular meal timing also play important roles in maintaining optimal nutrition and energy levels throughout the day.",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        author: "Dr. Lisa Park",
        readTime: "4 min read"
      },
      {
        title: "Exercise & Fitness",
        category: "Fitness",
        description: "Fitness guidelines, exercise routines, and staying active for better health and longevity.",
        content: "Regular physical activity is essential for maintaining health and preventing chronic diseases. Adults should aim for at least 150 minutes of moderate-intensity aerobic activity per week, plus muscle-strengthening activities. Start slowly if you're new to exercise, and gradually increase intensity and duration. Always consult with healthcare providers before starting new exercise programs.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        author: "Dr. James Wilson",
        readTime: "5 min read"
      },
      {
        title: "Preventive Care",
        category: "Prevention",
        description: "Vaccination schedules, health screenings, and preventive measures to maintain optimal health.",
        content: "Preventive care focuses on maintaining health and preventing disease before symptoms appear. This includes regular health screenings, vaccinations, lifestyle counseling, and early detection tests. Age-appropriate screenings for conditions like cancer, cardiovascular disease, and diabetes are crucial for early intervention and better health outcomes.",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        author: "Dr. Maria Gonzalez",
        readTime: "6 min read"
      }
    ];

    sampleTopics.forEach(topic => {
      this.createHealthTopic(topic);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSymptomAnalysis(insertAnalysis: InsertSymptomAnalysis): Promise<SymptomAnalysis> {
    const id = this.currentAnalysisId++;
    
    // Generate anonymous session ID for HIPAA compliance
    const sessionId = this.generateAnonymousSessionId();
    
    // Generate basic analysis based on symptoms
    const analysis = this.generateSymptomAnalysis(insertAnalysis);
    
    const symptomAnalysis: SymptomAnalysis = {
      ...insertAnalysis,
      id,
      sessionId,
      analysis,
      additionalSymptoms: insertAnalysis.additionalSymptoms || null,
      medicalHistory: insertAnalysis.medicalHistory || null,
      createdAt: new Date(),
    };
    
    // Store temporarily for session only - automatically clean up after 24 hours
    this.symptomAnalyses.set(id, symptomAnalysis);
    
    // Schedule cleanup (in production, use proper job scheduling)
    setTimeout(() => {
      this.symptomAnalyses.delete(id);
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    return symptomAnalysis;
  }

  async getSymptomAnalysis(id: number): Promise<SymptomAnalysis | undefined> {
    return this.symptomAnalyses.get(id);
  }

  async getHealthTopics(): Promise<HealthTopic[]> {
    return Array.from(this.healthTopics.values()).sort((a, b) => 
      new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    );
  }

  async getHealthTopicsByCategory(category: string): Promise<HealthTopic[]> {
    return Array.from(this.healthTopics.values())
      .filter(topic => topic.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async searchHealthTopics(query: string): Promise<HealthTopic[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.healthTopics.values())
      .filter(topic => 
        topic.title.toLowerCase().includes(lowercaseQuery) ||
        topic.description.toLowerCase().includes(lowercaseQuery) ||
        topic.content.toLowerCase().includes(lowercaseQuery) ||
        topic.category.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async createHealthTopic(insertTopic: InsertHealthTopic): Promise<HealthTopic> {
    const id = this.currentTopicId++;
    const healthTopic: HealthTopic = {
      ...insertTopic,
      id,
      imageUrl: insertTopic.imageUrl || null,
      author: insertTopic.author || null,
      readTime: insertTopic.readTime || null,
      publishedAt: new Date(),
    };
    this.healthTopics.set(id, healthTopic);
    return healthTopic;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const contactMessage: ContactMessage = {
      ...insertMessage,
      id,
      phone: insertMessage.phone || null,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  private generateAnonymousSessionId(): string {
    return 'session_' + Math.random().toString(36).substring(2) + '_' + Date.now();
  }

  private generateSymptomAnalysis(symptoms: InsertSymptomAnalysis): any {
    const primarySymptoms = symptoms.primarySymptoms.toLowerCase();
    const additionalSymptoms = symptoms.additionalSymptoms || [];
    
    // Basic symptom matching logic
    const conditions: Array<{ name: string; match: number; description: string }> = [];
    const recommendations: string[] = [];

    // Common cold symptoms
    if (primarySymptoms.includes('runny nose') || primarySymptoms.includes('cough') || 
        primarySymptoms.includes('sore throat') || additionalSymptoms.includes('Fever')) {
      conditions.push({
        name: 'Common Cold',
        match: 75,
        description: 'Based on symptoms: runny nose, mild fever, fatigue'
      });
      recommendations.push('Get plenty of rest and stay hydrated');
      recommendations.push('Consider over-the-counter pain relievers');
      recommendations.push('Monitor symptoms for 3-5 days');
    }

    // Headache-related conditions
    if (primarySymptoms.includes('headache')) {
      if (symptoms.painLevel >= 7) {
        conditions.push({
          name: 'Severe Headache/Migraine',
          match: 80,
          description: 'Based on high pain level and headache symptoms'
        });
        recommendations.push('Rest in a dark, quiet room');
        recommendations.push('Apply cold or warm compress');
        recommendations.push('Consider prescribed migraine medication');
      } else {
        conditions.push({
          name: 'Tension Headache',
          match: 70,
          description: 'Based on moderate headache symptoms'
        });
        recommendations.push('Practice stress management techniques');
        recommendations.push('Ensure adequate hydration');
        recommendations.push('Consider over-the-counter pain relievers');
      }
    }

    // Flu-like symptoms
    if (additionalSymptoms.includes('Fever') && additionalSymptoms.includes('Fatigue') && 
        (primarySymptoms.includes('body ache') || primarySymptoms.includes('muscle pain'))) {
      conditions.push({
        name: 'Influenza (Flu)',
        match: 85,
        description: 'Based on fever, fatigue, and body aches'
      });
      recommendations.push('Get plenty of rest');
      recommendations.push('Stay hydrated with fluids');
      recommendations.push('Consider antiviral medication if within 48 hours of symptom onset');
    }

    // Digestive issues
    if (primarySymptoms.includes('nausea') || primarySymptoms.includes('stomach') || 
        additionalSymptoms.includes('Nausea')) {
      conditions.push({
        name: 'Gastroenteritis',
        match: 65,
        description: 'Based on digestive symptoms'
      });
      recommendations.push('Stay hydrated with clear fluids');
      recommendations.push('Follow BRAT diet (Bananas, Rice, Applesauce, Toast)');
      recommendations.push('Avoid dairy and fatty foods');
    }

    // Default recommendations
    if (recommendations.length === 0) {
      recommendations.push('Monitor symptoms closely');
      recommendations.push('Stay hydrated and get adequate rest');
      recommendations.push('Consider over-the-counter symptom relief as appropriate');
    }

    // Always add medical consultation recommendation for persistent symptoms
    if (symptoms.duration === 'More than 1 week' || symptoms.painLevel >= 8) {
      recommendations.push('Consult a healthcare provider promptly');
    } else {
      recommendations.push('Consult a doctor if symptoms worsen or persist');
    }

    // Default condition if none matched
    if (conditions.length === 0) {
      conditions.push({
        name: 'General Symptoms',
        match: 50,
        description: 'Symptoms require further evaluation'
      });
    }

    return {
      possibleConditions: conditions,
      recommendations,
      urgencyLevel: symptoms.painLevel >= 8 || symptoms.duration === 'More than 1 week' ? 'high' : 'moderate',
      followUpAdvice: 'If symptoms worsen or new symptoms develop, seek immediate medical attention.'
    };
  }
}

// DatabaseStorage implementation using PostgreSQL
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createSymptomAnalysis(insertAnalysis: InsertSymptomAnalysis): Promise<SymptomAnalysis> {
    // Generate anonymous session ID for HIPAA compliance
    const sessionId = this.generateAnonymousSessionId();
    
    // Generate analysis based on symptoms
    const analysis = this.generateSymptomAnalysis(insertAnalysis);
    
    const [symptomAnalysis] = await db
      .insert(symptomAnalyses)
      .values({
        ...insertAnalysis,
        sessionId,
        analysis,
        additionalSymptoms: insertAnalysis.additionalSymptoms || null,
      })
      .returning();
    
    return symptomAnalysis;
  }

  async getSymptomAnalysis(id: number): Promise<SymptomAnalysis | undefined> {
    const [analysis] = await db.select().from(symptomAnalyses).where(eq(symptomAnalyses.id, id));
    return analysis || undefined;
  }

  async getHealthTopics(): Promise<HealthTopic[]> {
    return await db.select().from(healthTopics);
  }

  async getHealthTopicsByCategory(category: string): Promise<HealthTopic[]> {
    return await db.select().from(healthTopics).where(eq(healthTopics.category, category));
  }

  async searchHealthTopics(query: string): Promise<HealthTopic[]> {
    return await db.select().from(healthTopics).where(
      or(
        like(healthTopics.title, `%${query}%`),
        like(healthTopics.description, `%${query}%`),
        like(healthTopics.content, `%${query}%`)
      )
    );
  }

  async createHealthTopic(insertTopic: InsertHealthTopic): Promise<HealthTopic> {
    const [healthTopic] = await db
      .insert(healthTopics)
      .values({
        ...insertTopic,
        imageUrl: insertTopic.imageUrl || null,
        author: insertTopic.author || null,
        readTime: insertTopic.readTime || null,
      })
      .returning();
    return healthTopic;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db
      .insert(contactMessages)
      .values({
        ...insertMessage,
        phone: insertMessage.phone || null,
      })
      .returning();
    return contactMessage;
  }

  private generateAnonymousSessionId(): string {
    return 'session_' + Math.random().toString(36).substring(2) + '_' + Date.now();
  }

  private generateSymptomAnalysis(symptoms: InsertSymptomAnalysis): any {
    const primarySymptoms = symptoms.primarySymptoms.toLowerCase();
    const additionalSymptoms = symptoms.additionalSymptoms || [];
    
    // Basic symptom analysis logic (in production, this would use AI/ML)
    const conditions = [];
    const recommendations = [];
    
    // Fever-related conditions
    if (primarySymptoms.includes('fever') || additionalSymptoms.includes('Fever')) {
      conditions.push({
        name: 'Viral Infection',
        match: 75,
        description: 'Based on fever symptoms'
      });
      recommendations.push('Rest and stay hydrated');
      recommendations.push('Monitor temperature regularly');
    }
    
    // Pain-related conditions
    if (primarySymptoms.includes('pain') || symptoms.painLevel >= 6) {
      conditions.push({
        name: 'Acute Pain Syndrome',
        match: 70,
        description: 'Based on reported pain levels'
      });
      recommendations.push('Consider over-the-counter pain relief');
      recommendations.push('Apply heat or cold therapy as appropriate');
    }
    
    // Digestive issues
    if (primarySymptoms.includes('nausea') || primarySymptoms.includes('stomach') || 
        additionalSymptoms.includes('Nausea')) {
      conditions.push({
        name: 'Gastroenteritis',
        match: 65,
        description: 'Based on digestive symptoms'
      });
      recommendations.push('Stay hydrated with clear fluids');
      recommendations.push('Follow BRAT diet (Bananas, Rice, Applesauce, Toast)');
    }
    
    // Default recommendations
    if (recommendations.length === 0) {
      recommendations.push('Monitor symptoms closely');
      recommendations.push('Consult healthcare provider if symptoms persist');
    }
    
    return {
      conditions,
      recommendations,
      riskLevel: symptoms.painLevel >= 7 ? 'high' : symptoms.painLevel >= 4 ? 'moderate' : 'low',
      urgencyLevel: symptoms.painLevel >= 8 || symptoms.duration === 'More than 1 week' ? 'high' : 'moderate',
      followUpAdvice: 'If symptoms worsen or new symptoms develop, seek immediate medical attention.'
    };
  }
}

export const storage = new DatabaseStorage();
