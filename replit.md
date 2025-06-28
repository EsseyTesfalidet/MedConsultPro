# MedConsult Pro - Medical Consultation Platform

## Overview

MedConsult Pro is a full-stack medical consultation web application built with React, Express.js, and PostgreSQL. The platform provides users with a symptom checker, health information resources, and contact functionality for medical inquiries. The application follows a modern architecture with TypeScript throughout, shadcn/ui components, and Drizzle ORM for database management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom medical-themed design system
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with structured error responses
- **Logging**: Custom request logging with timing and response data
- **Development**: Hot reloading via Vite middleware integration

### Database Architecture
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Schema Management**: Drizzle Kit for migrations and schema generation
- **Validation**: Drizzle-Zod integration for runtime validation

## Key Components

### Database Schema
The application uses four main database tables:
- **users**: User authentication and profiles
- **symptom_analyses**: Stores symptom checker results and AI analysis
- **health_topics**: Medical articles and health information content
- **contact_messages**: User inquiries and contact form submissions

### API Endpoints
- `POST /api/symptom-analysis`: Create new symptom analysis
- `GET /api/symptom-analysis/:id`: Retrieve specific analysis
- `GET /api/health-topics`: Fetch all health topics
- `GET /api/health-topics/search`: Search health topics by query
- `POST /api/contact`: Submit contact form messages

### UI Components
- **Symptom Checker**: Multi-step form with pain level slider and symptom selection
- **Health Information**: Searchable health topics with category filtering
- **Contact Section**: Comprehensive contact form with validation
- **Medical Disclaimer**: Legal compliance component
- **Responsive Design**: Mobile-first approach with breakpoint management

## Data Flow

1. **Symptom Analysis Flow**:
   - User completes symptom checker form
   - Form data validated with Zod schemas
   - API processes symptoms and generates analysis
   - Results stored in database and returned to user

2. **Health Information Flow**:
   - Topics fetched from database on page load
   - Search functionality queries database in real-time
   - Content displayed with medical categorization

3. **Contact Form Flow**:
   - Form validation with React Hook Form
   - Data submission to API endpoint
   - Storage in database with timestamp
   - Success confirmation to user

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection driver
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation
- **@radix-ui/***: Accessible UI primitives

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling for server code
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- Express server with hot reloading
- PostgreSQL database via Neon serverless
- Environment variables for database configuration

### Production Build
- Frontend: Vite build to `dist/public`
- Backend: esbuild bundle to `dist/index.js`
- Static file serving via Express
- Database migrations via Drizzle Kit

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)
- Build scripts handle both frontend and backend compilation

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
- June 28, 2025. Added PostgreSQL database with DatabaseStorage implementation
  - Migrated from in-memory storage to persistent PostgreSQL database
  - Added HIPAA-compliant anonymous session tracking
  - Implemented database seeding for health topics
  - All data now persists across application restarts
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```