# Get Perk'd Deployment Configuration for getperkd.co

## Domain Setup Ready ✅

Your Get Perk'd application is fully configured to work with `getperkd.co` domain.

### Campus Subdomains Available:
- **Main**: `getperkd.co`
- **UTSA**: `utsa.getperkd.co` 
- **Texas State**: `txst.getperkd.co`
- **UT Austin**: `ut.getperkd.co`
- **UT Health**: `uthsc.getperkd.co`
- **Alamo Colleges**: 
  - `sac.getperkd.co` (San Antonio College)
  - `nwv.getperkd.co` (Northwest Vista)
  - `pac.getperkd.co` (Palo Alto College)
  - `nlc.getperkd.co` (Northeast Lakeview)
  - `spc.getperkd.co` (St. Phillips)
- **Private Universities**:
  - `stmu.getperkd.co` (St. Mary's)
  - `tu.getperkd.co` (Trinity University)
  - `uiw.getperkd.co` (UIW)
- **Trade Schools**:
  - `sci.getperkd.co` (Southern Careers Institute)
  - `hu.getperkd.co` (Hallmark University)
  - `gu.getperkd.co` (Galen College)

## DNS Configuration Needed:

### For Main Domain:
```
A Record: @ → [Your Replit Deployment IP]
CNAME: www → [your-app].replit.app
```

### For Campus Subdomains:
```
CNAME: utsa → [your-app].replit.app
CNAME: txst → [your-app].replit.app
CNAME: ut → [your-app].replit.app
CNAME: uthsc → [your-app].replit.app
CNAME: sac → [your-app].replit.app
CNAME: nwv → [your-app].replit.app
CNAME: pac → [your-app].replit.app
CNAME: nlc → [your-app].replit.app
CNAME: spc → [your-app].replit.app
CNAME: stmu → [your-app].replit.app
CNAME: tu → [your-app].replit.app
CNAME: uiw → [your-app].replit.app
CNAME: sci → [your-app].replit.app
CNAME: hu → [your-app].replit.app
CNAME: gu → [your-app].replit.app
```

## Next Steps:

1. **Deploy to Replit** (click Deploy button)
2. **Get your deployment URL** (ends with .replit.app)  
3. **Configure DNS** with your domain provider
4. **Add custom domain** in Replit deployment settings
5. **Test authentication** on the live domain

## Authentication Testing Plan:

Once deployed to `get_perk.co`:
1. Test signup with `demo.user@gmail.com`
2. Verify email confirmation flow
3. Test login persistence 
4. Check campus subdomain routing

Your application is ready for deployment with the custom domain!