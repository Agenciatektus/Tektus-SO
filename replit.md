# replit.md

## Overview

This is a comprehensive client management and operations platform built with a modern full-stack architecture. The application provides CRM functionality, task management, financial tracking, content management, and automated workflows for business operations. It's designed as a single-page application with a React frontend and Express.js backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite for development and building
- **Backend**: Express.js with TypeScript, serving both API endpoints and static files
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Passport.js with local strategy and session-based authentication
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Database Schema
The database uses PostgreSQL with a comprehensive schema including:
- **Users**: Authentication and role-based access control (admin, operations, sales, finance)
- **Clients**: Customer relationship management with health scoring
- **Projects**: Project management linked to clients
- **Tasks**: Task tracking with priority, status, and assignment
- **Invoices & Payments**: Financial management and billing
- **Content**: Content management system with approval workflows
- **Onboarding/Offboarding**: Automated client lifecycle management
- **Feedback**: Customer feedback collection

### Authentication System
- Session-based authentication using express-session
- Password hashing with scrypt for security
- Role-based access control for different user types
- Protected routes on both client and server sides

### Frontend Architecture
- Component-based React architecture with TypeScript
- Shared UI components using shadcn/ui library
- Custom hooks for authentication and data fetching
- Responsive design with mobile-first approach
- Dark theme implementation with CSS custom properties

### Backend API Structure
- RESTful API endpoints organized by feature
- Middleware for authentication and request logging
- Comprehensive CRUD operations for all entities
- Dashboard analytics and reporting endpoints
- Session management with PostgreSQL session store

## Data Flow

1. **Authentication Flow**: Users log in through the auth page, creating a session stored in PostgreSQL
2. **Data Fetching**: Client components use TanStack Query to fetch data from API endpoints
3. **State Management**: Server state is cached and synchronized using React Query
4. **Database Operations**: All database operations go through Drizzle ORM with type safety
5. **Real-time Updates**: Data is refreshed through query invalidation after mutations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **passport**: Authentication middleware
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **wouter**: Lightweight routing library

### Development Dependencies
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Backend bundling for production

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

### Development
- Uses Vite dev server for frontend with HMR
- Express server runs on port 5000
- Database connection via environment variable `DATABASE_URL`
- Session secret via environment variable `SESSION_SECRET`

### Production Build
- Frontend builds to `dist/public` directory
- Backend bundles with esbuild to `dist/index.js`
- Static files served by Express in production
- Autoscale deployment target configured

### Database Setup
- Drizzle migrations stored in `./migrations` directory
- Schema defined in `shared/schema.ts` for type sharing
- Database push command: `npm run db:push`

The application is designed to be highly scalable and maintainable, with clear separation of concerns and comprehensive type safety throughout the stack.