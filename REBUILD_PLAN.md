# 🔧 CORRECTIVE REBUILD PLAN - Next.js 14 + Supabase

## IMMEDIATE ACTION PLAN

### Phase 1: Framework Migration (Express.js → Next.js 14)
1. Replace Express.js server with Next.js 14 App Router
2. Convert `client/` structure to `app/` directory
3. Implement proper file-based routing
4. Remove all Vite + Express configurations

### Phase 2: Schema Integrity Restoration  
1. Convert all camelCase fields to snake_case
2. Remove unauthorized franchise territory tables
3. Align with original ZIP file schema structure
4. Maintain Supabase compatibility

### Phase 3: Authentication Cleanup
1. Remove custom middleware layers
2. Implement direct Supabase JWT validation
3. Use approved supabase-server.ts pattern
4. Ensure SSR compatibility

### Phase 4: Feature Rollback
1. Remove multilingual systems
2. Remove franchise logic
3. Remove unauthorized middleware
4. Focus on approved roadmap only

## APPROVED FEATURE SCOPE
- Loyalty card system (from ZIP files)
- Basic analytics
- Student dashboard
- Business dashboard
- Core authentication

## FILES TO PRESERVE
- Core loyalty logic from ZIP files
- Approved authentication patterns
- Original business requirements

## FILES TO REMOVE/REBUILD
- All Express.js configurations
- Custom middleware layers
- Franchise territory system
- Multilingual abstractions