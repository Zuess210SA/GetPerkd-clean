# Get Perk'd - Student Rewards Platform

## Quick Start

```bash
npm run dev
```

## Architecture

This is a Next.js 14 application with:
- App Router for file-based routing
- Supabase for authentication and database
- TailwindCSS for styling
- TypeScript for type safety

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema changes to database

## Project Structure

```
app/                 # Next.js App Router pages
├── api/            # API routes
├── auth/           # Authentication pages
└── dashboard/      # Protected dashboard pages

utils/              # Supabase utilities
shared/             # Shared types and schema
types/              # TypeScript type definitions
```

## Corrective Rebuild Status

This project is currently undergoing a corrective rebuild to restore the original Next.js 14 + Supabase architecture with snake_case schema naming.