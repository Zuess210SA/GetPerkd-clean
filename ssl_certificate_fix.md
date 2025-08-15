# SSL Certificate Fix for www.getperkd.co

## Problem:
Chrome error "NET::ERR_CERT_COMMON_NAME_INVALID" when accessing https://www.getperkd.co

## Root Cause:
The SSL certificate was issued for `getperkd.co` but not for `www.getperkd.co` - these are treated as separate domains.

## Solutions:

### Option 1: Update Replit Domain Configuration (Recommended)
1. In Replit deployment settings, add BOTH domains:
   - `getperkd.co` 
   - `www.getperkd.co`
2. Replit will generate SSL certificates for both domains

### Option 2: Use Primary Domain Only
**Use**: https://getperkd.co (without www) - this one works perfectly

### Option 3: DNS Redirect (Alternative)
In GoDaddy, set up a redirect from www.getperkd.co → getperkd.co

## Quick Test:
- **✅ Works**: https://getperkd.co (main domain)
- **❌ SSL Error**: https://www.getperkd.co (www subdomain)

## Immediate Fix:
Go to Replit deployment settings and add `www.getperkd.co` as an additional custom domain. Replit will generate a separate SSL certificate for the www version.

## Status:
Your main domain (getperkd.co) is working perfectly with SSL. The www version just needs to be added to Replit's domain configuration.