# Get Perk'd - Student Discount Platform

## Overview
Get Perk'd is a comprehensive student rewards platform connecting students across various educational institutions with local businesses offering exclusive discounts. The platform supports traditional higher education, vocational schools, and career-focused programs, providing businesses with tools to target specific student demographics and manage offers across multiple campus types. The business vision includes expanding into POS infrastructure and ultimately launching a fintech company, aiming for a strategic progression from Get Perk'd to POS systems, and then to a financial technology platform.

## User Preferences
Preferred communication style: Simple, everyday language.
Strategic Philosophy: Focus on real-world user behavior over academic theory - prioritize daily routine integration over institutional verification.
Email Strategy: Simple, clean email collection without promotional messaging - let behavior drive verification rather than email domains.
Revenue projections require realistic analysis based on market data rather than optimistic assumptions.
Performance-conscious mindset: User is cautious about adding features that might slow down the PWA. Prefers conservative, measured approach to optimizations with clear before/after testing.
Project collaboration style: Appreciates comprehensive technical support and detailed implementation. Values authentic cultural understanding and strategic business guidance.

## System Architecture

### Frontend
- **Framework**: React with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS with shadcn/ui
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM (Neon serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses

### Core Features & Design Patterns
- **User Types**: Students, Businesses, Staff, Admin.
- **Authentication**: Supabase Authentication with secure session management, role-based access, and token refresh.
- **Data Management**: PostgreSQL schema for users, businesses, deals, redemptions, and staff profiles. `snake_case` naming convention.
- **Staff Management**: PIN-based authentication, role-based access (Staff, Manager, Admin), and redemption verification.
- **Deal Management**: Category filtering, search, redemption system, expiration tracking, and usage limits.
- **Business Dashboard**: Deal creation, analytics, staff management, and Stripe-powered subscription management. Merchant dashboards configured for DIY, DFY, and Franchisee plans.
- **Notification System**: Multi-channel (OneSignal push, SendGrid email, Twilio SMS) with user preferences, smart filtering (category, daily limits, discount percentage, trending/high-value deals), automated notifications, security, and logging.
- **Internationalization**: Multi-language support with cultural intelligence engine adapting emoji and tone for different regions (e.g., Tex-Mex Spanglish, Gen Z vibes).
- **Gamification**: Daily streaks, point-based reward shop, campus-specific challenges (QR Social Sharing), rarity-based rewards, and ambassador skill development roadmap.
- **Branding**: Custom logo with specific color schemes (blue "Get", green "Perk'd").
- **Deployment**: Optimized for performance with static file serving, API routes, and SPA fallback. Mobile-first responsive design.
- **Architecture Decisions**: Unified multi-role PWA architecture with single codebase, role-based layouts, dynamic navigation, and private routing. Code splitting and skeleton loaders for performance.
- **Territory Management**: Flexible corporate vs. franchise territory assignment with revenue sharing logic.
- **Franchisee Acquisition System**: Comprehensive recruitment portal, pipeline management, territory assignment, and revenue projections calculator.
- **AI Integration**: AI-powered deal recommendation engine with seasonal intelligence, merchant engagement analysis, recommendation history, and student feedback loop.
- **Onboarding**: Interactive onboarding wizards for both students (university selection) and merchants (multi-step setup with AI sample deal creation).
- **Physical Marketing**: QR Poster Builder Kit with AI copy generation and ambassador poster templates.
- **Analytics & Dashboards**: Comprehensive suite including launch analytics, student acquisition, partner outreach, and cultural analytics. Real-time system health dashboard with emoji indicators.
- **Subdomain Strategy**: Campus-specific subdomain routing (e.g., utsa.getperkd.co) with dynamic theming and automatic detection.

## External Dependencies

- **@supabase/supabase-js**: Supabase authentication and database interaction.
- **@neondatabase/serverless**: Neon PostgreSQL connection.
- **drizzle-orm**: Type-safe database operations.
- **@tanstack/react-query**: Server state management.
- **@radix-ui/***: Accessible UI components.
- **canvas-confetti**: Celebration animations.
- **wouter**: Client-side routing.
- **stripe**: Payment processing integration.
- **@stripe/stripe-js**: Stripe frontend integration.
- **react-onesignal**: OneSignal React SDK for push notifications.
- **@sendgrid/mail**: SendGrid email service integration.
- **twilio**: Twilio SMS service integration.
- **OpenAI API**: For AI-powered deal recommendations and cultural intelligence.