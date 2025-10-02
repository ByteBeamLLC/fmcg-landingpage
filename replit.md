# ByteBeam - AI-Powered Knowledge Work Automation Platform

## Overview

ByteBeam is an AI-powered platform that automates document-based knowledge work processes requiring expert analysis. The platform automates any workflow involving document processing, data extraction, reasoning decisions, and content generation across multiple industries.

**Core Offering - FMCG Compliance Agent:**
The FMCG Agent automates label compliance and localization for products entering GCC markets. It extracts product information from artwork, translates content to Arabic, validates against local regulations, and generates compliant labels and submission forms for food retailers, FMCG brands, and distributors.

The application is built as a full-stack web application with a React-based frontend and Express.js backend, featuring a dark theme design and modern animations.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Dark theme with abstract, platform-relevant visuals.
Content strategy: Follow V7 Labs approach - simple headlines, visual storytelling, concrete examples, minimal text. Show, don't tell.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Framer Motion for animations and transitions
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens

**Design System:**
- Custom color scheme with CSS variables for theming
- Neutral base color palette with primary (blue), accent (green), and secondary (dark) colors
- Custom font stack: Inter for body text, Space Grotesk for display text
- 12px border radius defined via CSS custom properties
- Responsive design with mobile-first approach

**Component Structure:**
- Atomic design pattern with reusable UI components in `/client/src/components/ui`
- Page-level components for major sections (Hero, Pain Points, Industry Solutions, etc.)
- Multi-page application structure with home page and platform landing page
- Platform page (`/platform`) features simplified hero section with:
  - Rotating industry headlines (Healthcare, Insurance, FMCG, Finance)
  - Interactive 3-step visual workflow showing document processing
  - Simple, non-technical messaging following V7 Labs content strategy
  - Animated document files and progress indicators
- Component composition using Radix UI primitives for accessibility

**State Management:**
- QueryClient configured with infinite stale time and disabled automatic refetching
- Custom query functions with 401 handling for authentication flows
- Toast notifications for user feedback
- Form state managed via React Hook Form with Zod validation

### Backend Architecture

**Technology Stack:**
- Node.js runtime with Express.js framework
- TypeScript with ESM module format
- HTTP server creation for potential WebSocket upgrades
- Development mode using tsx for TypeScript execution

**API Design:**
- RESTful API pattern with `/api` prefix for all backend routes
- Centralized route registration in `server/routes.ts`
- Request/response logging middleware with JSON response capture
- Raw body parsing enabled for webhook integrations

**Storage Layer:**
- Abstract storage interface (`IStorage`) for data operations
- In-memory storage implementation (`MemStorage`) for development
- User CRUD operations defined (getUser, getUserByUsername, createUser)
- Designed to be swapped with database implementation in production

### Data Storage Solutions

**Database Configuration:**
- Drizzle ORM configured for PostgreSQL dialect
- Schema definitions in `/shared/schema.ts` for shared type safety
- Neon Database serverless driver for PostgreSQL connections
- Migration files output to `/migrations` directory
- Connection string via `DATABASE_URL` environment variable

**Schema Design:**
- Users table with UUID primary keys (generated via PostgreSQL `gen_random_uuid()`)
- Username/password authentication fields
- Zod schema validation integrated with Drizzle for runtime type checking
- Shared types exported for both frontend and backend consumption

**Rationale:**
The storage interface abstraction allows development to proceed with in-memory storage while maintaining the ability to swap in a production database implementation. Drizzle ORM provides type-safe database operations with minimal overhead, and the serverless Neon driver supports edge deployment scenarios.

### Authentication and Authorization

**Current State:**
- User schema defined with username/password fields
- No authentication middleware currently implemented
- Storage interface includes user lookup methods
- Session management via `connect-pg-simple` package included in dependencies

**Intended Architecture:**
- Session-based authentication using PostgreSQL session store
- Cookie-based session management
- Protected API routes with authentication middleware
- Role-based access control potential with user schema extension

### External Dependencies

**UI Component Library:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui configuration in `components.json` with "new-york" style
- Component aliases configured via TypeScript path mapping

**Animation and Interaction:**
- Framer Motion for declarative animations
- React Intersection Observer for scroll-based triggers
- Embla Carousel for image/content carousels

**Form Handling:**
- React Hook Form for performant form state management
- Hookform Resolvers for Zod schema integration
- Zod for runtime validation and TypeScript type inference

**Development Tools:**
- Replit-specific plugins for runtime error overlay and development banner
- Cartographer plugin for code navigation
- Vite plugin ecosystem for HMR and build optimization

**Build and Deployment:**
- esbuild for production backend bundling
- Vite for frontend asset bundling
- Platform-agnostic Node.js bundle output
- Static asset serving with Vite middleware in development

**Key Design Decisions:**
1. **Monorepo Structure:** Shared schema between client and server prevents type drift and enables end-to-end type safety
2. **Storage Abstraction:** Interface-based design allows switching between in-memory and database implementations without code changes
3. **Component Library:** shadcn/ui provides owned, customizable components rather than external dependencies
4. **Build Strategy:** Separate bundling for client (Vite) and server (esbuild) optimizes for their respective runtime environments
5. **Static Assets:** Assets stored in `attached_assets` directory with Vite alias for consistent imports