# Updated Domain Strategy - www.getperkd.co Working

## ✅ Current DNS Status:
**Working Record**: `CNAME: www → getperkd.co` (1 Hour TTL)

## Next Steps:

### Step 1: Update Replit Domain
In your Replit deployment:
1. Remove or update the current `getperkd.co` entry
2. Add `www.getperkd.co` as your custom domain
3. This should verify successfully with the CNAME record

### Step 2: Campus Subdomains
Add these CNAME records in GoDaddy (same format):
```
utsa → student-perks-robertmcveigh19.replit.app
txst → student-perks-robertmcveigh19.replit.app
ut → student-perks-robertmcveigh19.replit.app
sac → student-perks-robertmcveigh19.replit.app
```

### Step 3: Your Professional URLs
Once setup, you'll have:
- **Main**: https://www.getperkd.co
- **UTSA**: https://utsa.getperkd.co
- **Texas State**: https://txst.getperkd.co
- **UT Austin**: https://ut.getperkd.co

### Step 4: Root Domain Redirect (Optional)
Later, you can add a redirect from `getperkd.co` → `www.getperkd.co` in GoDaddy's forwarding settings.

## Current Status:
The www subdomain approach bypasses the root domain CNAME restriction and should work perfectly with Replit's verification system.

Try updating your Replit deployment to use `www.getperkd.co` instead of `getperkd.co`.