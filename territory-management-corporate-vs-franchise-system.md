# Territory Management: Corporate vs Franchise Assignment System

## Overview

Get Perk'd's territory management system now supports flexible assignment of territories to either **Corporate** (company-owned) or **Franchise** (franchisee-owned) operations. This dual ownership model provides maximum business flexibility for strategic market control and franchise expansion.

## Territory Ownership Types

### 1. Corporate Territories
- **Owner**: Company-owned and operated
- **Franchise ID**: NULL (no franchisee assigned)
- **Corporate Region**: Required field (e.g., "Texas", "Southwest", "National")
- **Revenue Share**: 0% to franchisee, 100% to company
- **Use Cases**:
  - Strategic markets the company wants to control directly
  - High-value territories with major universities
  - Test markets for new features or pricing models
  - Markets where franchisee recruitment is challenging

### 2. Franchise Territories
- **Owner**: Franchisee-owned and operated
- **Franchise ID**: Required (references users table)
- **Corporate Region**: NULL (not applicable)
- **Revenue Share**: 15% to franchisee, 85% to company (configurable)
- **Use Cases**:
  - Markets suitable for local franchisee management
  - Expansion into new geographic areas
  - Markets where local knowledge is critical
  - Standard franchise business model

## Database Schema Changes

### franchise_territories Table
```sql
-- Updated schema with ownership flexibility
ownershipType: text("ownership_type").notNull().default("franchise") -- "corporate" or "franchise"
corporateRegion: text("corporate_region") -- Required for corporate territories
franchiseeId: integer("franchisee_id").references(() => users.id) -- NULL for corporate territories
```

### business_territory_assignments Table
```sql
-- Updated assignment tracking
ownershipType: text("ownership_type").notNull().default("franchise") -- "corporate" or "franchise"
franchiseeId: integer("franchisee_id").references(() => users.id) -- NULL for corporate territories
```

## API Endpoints

### Create Corporate Territory
```bash
POST /api/admin/territories/city
{
  "cityName": "Austin",
  "state": "TX",
  "zipCodes": ["78701", "78702", "78703"],
  "campuses": ["UT Austin", "ACC"],
  "channelType": "university",
  "ownershipType": "corporate",
  "corporateRegion": "Texas"
}
```

### Create Franchise Territory
```bash
POST /api/admin/territories/city
{
  "franchiseeId": 123,
  "cityName": "San Antonio",
  "state": "TX",
  "zipCodes": ["78201", "78202", "78203"],
  "campuses": ["UTSA", "Alamo Colleges"],
  "channelType": "mixed",
  "ownershipType": "franchise",
  "revenueSharePercent": 15
}
```

## Business Assignment Logic

### Automatic Assignment Process
1. **Business Registration**: When a new business registers
2. **Location Analysis**: System analyzes business address, zip code, and campus affiliation
3. **Territory Matching**: Finds best matching territory based on:
   - Zip code coverage
   - Campus assignment (if applicable)  
   - City name fallback matching
4. **Ownership Detection**: Determines if matched territory is corporate or franchise
5. **Assignment Creation**: Creates business_territory_assignment with appropriate ownership type

### Assignment Results
- **Corporate Assignment**: `franchiseeId = NULL`, `ownershipType = "corporate"`
- **Franchise Assignment**: `franchiseeId = [franchisee_id]`, `ownershipType = "franchise"`

## Revenue Management

### Payment Processing
- **All Payments**: Company processes all merchant payments centrally through Stripe
- **Corporate Territories**: Company keeps 100% of revenue
- **Franchise Territories**: Company keeps 85%, franchisee gets 15% (configurable)

### Automated Payout System
```javascript
// Monthly payout calculation (15th of each month)
if (territory.ownershipType === 'franchise') {
  const franchiseeShare = totalRevenue * (territory.revenueSharePercent / 100);
  // Process automated payout to franchisee
} else {
  // Corporate territory - no payout needed
}
```

## Management Interface

### Territory Creation Interface
- **Ownership Type Selection**: Corporate vs Franchise radio buttons
- **Conditional Fields**:
  - Corporate: Corporate Region selector (required)
  - Franchise: Franchisee selector (required)
- **Revenue Share Configuration**: Automatic for corporate (0%), configurable for franchise
- **Territory Preview**: Shows ownership structure before creation

### Territory Overview Dashboard
- **Ownership Breakdown**: Visual counts of corporate vs franchise territories
- **Revenue Distribution**: Shows company vs franchisee revenue splits
- **Territory Cards**: Clear ownership indicators with different styling
- **Management Actions**: Edit, transfer ownership, adjust revenue sharing

## Brand Ambassador Payment Structure

**IMPORTANT**: All University Brand Ambassadors are paid directly from Corporate revenue, not franchisee responsibility.

- **Corporate Responsibility**: Company handles all brand ambassador recruitment, training, and payment
- **Franchisee Focus**: Franchisees only need to focus on signing up businesses in their territory
- **Simplified Operations**: No ambassador management complexity for franchisees
- **Consistent Brand Experience**: Corporate maintains direct control over campus ambassador program

## Strategic Benefits

### For Company
1. **Market Control**: Direct operation of strategic territories
2. **Revenue Optimization**: Keep 100% revenue in key markets
3. **Testing Platform**: Use corporate territories for feature testing
4. **Franchise Preparation**: Operate territories before franchising them
5. **Brand Ambassador Control**: Direct management of campus ambassador program ensures consistent quality

### For Franchisees
1. **Simplified Operations**: Focus solely on business acquisition, no ambassador management
2. **Local Expertise**: Leverage franchisee's local market knowledge for merchant relationships
3. **Scalable Expansion**: Rapid geographic expansion through franchise network
4. **Reduced Complexity**: No need to recruit, train, or manage campus ambassadors
5. **Clear Revenue Focus**: Direct correlation between business signups and revenue share

## Territory Transfer Process

### Corporate to Franchise
1. Identify qualified franchisee for territory
2. Update territory ownership type and assign franchisee ID
3. Transfer existing business assignments
4. Begin revenue sharing from next billing cycle
5. Provide franchisee training and territory handover

### Franchise to Corporate
1. Company decision to acquire franchise territory
2. Negotiate buyout terms with current franchisee
3. Update territory ownership to corporate
4. Set franchisee ID to NULL
5. Company assumes 100% revenue from next billing cycle

## Technical Implementation

### Key Components
- `TerritoryManager.createCityTerritory()`: Handles both ownership types
- `FranchiseTerritoryManager.tsx`: Management interface with ownership controls
- `PayoutManager`: Revenue distribution with ownership-aware calculations
- Territory assignment logic: Automatic business assignment with ownership tracking

### Business Rules
1. **Corporate territories** cannot have revenue sharing > 0%
2. **Franchise territories** require valid franchisee assignment
3. **Territory transfers** require admin approval and audit logging
4. **Revenue sharing** changes take effect next billing cycle
5. **Business assignments** automatically inherit territory ownership type

## Future Enhancements

### Planned Features
1. **Ownership Transfer Workflow**: Streamlined process for changing territory ownership
2. **Multi-Franchisee Territories**: Allow multiple franchisees in large territories
3. **Performance-Based Ownership**: Automatic ownership changes based on performance metrics
4. **Franchisee Territory Requests**: Allow franchisees to request specific territories
5. **Corporate Territory Analytics**: Enhanced reporting for company-owned territories

## Launch Readiness

This corporate vs franchise territory system is fully implemented and ready for August 1st launch, providing:
- Complete flexibility in territory ownership assignment
- Automated revenue distribution based on ownership type
- Professional management interface for territory oversight
- Seamless business assignment process with ownership tracking
- Scalable foundation for franchise expansion strategy

The system supports Get Perk'd's strategic vision of maintaining control over key markets while enabling rapid expansion through the franchise network.