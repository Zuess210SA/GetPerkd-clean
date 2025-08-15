# GoDaddy DNS Troubleshooting for getperkd.co

## Current Issues from Screenshot:

### Issue 1: Root Domain (@) Record
**Error**: "Record data is invalid"
**Problem**: The @ record cannot be a CNAME for the root domain
**Solution**: Use A record instead of CNAME for @ (root domain)

### Issue 2: WWW Record Conflict
**Error**: "Record name www conflicts with another record"
**Problem**: There's already a www record that needs to be updated/replaced

## Correct DNS Setup for GoDaddy:

### Option 1: A Record for Root Domain (Recommended)
Since GoDaddy doesn't allow CNAME for @ (root), you need to get the IP address:

1. **Get Replit's IP Address**:
   - Run: `nslookup student-perks-robertmcveigh19.replit.app`
   - Or use: `dig student-perks-robertmcveigh19.replit.app`
   - Use that IP address for the A record

2. **DNS Records**:
```
Type: A
Name: @
Value: [IP address from nslookup]
TTL: 1/2 Hour
```

```
Type: CNAME
Name: www  
Value: student-perks-robertmcveigh19.replit.app
TTL: 1/2 Hour
```

### Option 2: Use WWW as Primary (Alternative)
If you want to use www.getperkd.co as your main site:

```
Type: CNAME
Name: www
Value: student-perks-robertmcveigh19.replit.app
TTL: 1/2 Hour
```

```
Type: 301 Redirect
From: @
To: www.getperkd.co
```

## Steps to Fix:

### Step 1: Delete Conflicting Records
- Delete any existing @ and www records that are causing conflicts
- Clear all DNS records for getperkd.co first

### Step 2: Add New Records
- Use Option 1 above with A record for @
- Add CNAME for www pointing to your Replit deployment

### Step 3: Alternative - Use Subdomain
If root domain continues to cause issues, you could use:
- `app.getperkd.co` as your main site
- Skip the @ record entirely

## Quick Fix Command:
To get the IP address for the A record:
```bash
nslookup student-perks-robertmcveigh19.replit.app
```

The root domain (@) issue is common with GoDaddy - they require A records, not CNAME records for the root domain.