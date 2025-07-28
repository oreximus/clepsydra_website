# Replit Configuration

## Overview

This is a full-stack web application built with React (Vite) on the frontend and Express.js on the backend. The application is a modern software development company landing page for Clepsydra Technologies, featuring a sage green/pink color palette, integrated company logo, comprehensive services showcase, and a working contact form system with email notifications using Nodemailer.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Email**: Nodemailer for contact form notifications
- **Session Management**: PostgreSQL-based session storage

### Project Structure
- `client/` - Frontend React application
- `server/` - Backend Express application
- `shared/` - Shared TypeScript schemas and types
- `migrations/` - Database migration files

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Contact Submissions Table**: Stores contact form data (name, email, phone, service, message, timestamp)

### API Endpoints
- `POST /api/contact` - Contact form submission with validation and email notification

### Storage Layer
- **Production**: Drizzle ORM with PostgreSQL
- **Development**: In-memory storage implementation for testing
- Abstracted through `IStorage` interface for flexibility

### UI Components
- Comprehensive shadcn/ui component library
- Custom color palette with sage green, cream, and soft pink theme
- Responsive design with mobile-first approach
- Form components with validation feedback

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on homepage
   - React Hook Form handles client-side validation using Zod schemas
   - Form data submitted to `/api/contact` endpoint
   - Server validates data and saves to database
   - Email notification sent via Nodemailer
   - Success/error feedback displayed to user

2. **Database Operations**:
   - Drizzle ORM manages database connections and queries
   - Shared schema definitions ensure type safety between frontend and backend
   - Migration system for database schema changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **nodemailer**: Email sending functionality
- **wouter**: Lightweight routing for React

### Development Tools
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public/`
- Backend: ESBuild bundles server code to `dist/`
- Single deployment artifact containing both frontend and backend

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)
- Email configuration for nodemailer (SMTP settings)

### Development Workflow
- `npm run dev`: Starts development server with Vite HMR
- `npm run build`: Creates production build
- `npm start`: Runs production server
- `npm run db:push`: Applies database schema changes

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (Neon Database recommended)
- SMTP service for email notifications
- Static file serving capability for frontend assets

The application is designed to be deployed on platforms like Replit, Vercel, or similar Node.js hosting services with minimal configuration requirements.