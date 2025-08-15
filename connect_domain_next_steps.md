# Connect getperkd.co to Your Deployment

## Your Deployment Info ✅
**Deployment URL**: `https://student-perks-robertmcveigh19.replit.app`
**Status**: Live and running
**Next**: Connect your custom domain

## Step 1: Add Custom Domain in Replit

1. **In your current deployment screen**, click **"Domains"** tab
2. **Click "Buy a new domain"** or look for **"Add Custom Domain"**
3. **Enter**: `getperkd.co`
4. **Click "Add Domain"**

## Step 2: Configure DNS in GoDaddy

### Access GoDaddy DNS:
1. Login to GoDaddy account
2. Find **getperkd.co** → Click **"DNS"**
3. **"Manage DNS"**

### Add These CNAME Records:

#### Main Domain:
```
Type: CNAME
Name: @
Value: student-perks-robertmcveigh19.replit.app
TTL: 1 Hour
```

#### WWW Subdomain:
```
Type: CNAME
Name: www  
Value: student-perks-robertmcveigh19.replit.app
TTL: 1 Hour
```

#### Campus Subdomains (Add each):
```
utsa → student-perks-robertmcveigh19.replit.app
txst → student-perks-robertmcveigh19.replit.app
ut → student-perks-robertmcveigh19.replit.app
uthsc → student-perks-robertmcveigh19.replit.app
sac → student-perks-robertmcveigh19.replit.app
nwv → student-perks-robertmcveigh19.replit.app
pac → student-perks-robertmcveigh19.replit.app
nlc → student-perks-robertmcveigh19.replit.app
spc → student-perks-robertmcveigh19.replit.app
stmu → student-perks-robertmcveigh19.replit.app
tu → student-perks-robertmcveigh19.replit.app
uiw → student-perks-robertmcveigh19.replit.app
```

## Step 3: Wait for Propagation
- **Time**: 10-30 minutes typically
- **Test**: Visit https://getperkd.co
- **Campus test**: Visit https://utsa.getperkd.co

## Step 4: Test Your Professional URLs

Once working, you'll have:
- **Main**: https://getperkd.co
- **UTSA**: https://utsa.getperkd.co  
- **Texas State**: https://txst.getperkd.co
- **UT Austin**: https://ut.getperkd.co

## Benefits You'll Get:
- Professional domain instead of long Replit URL
- Campus-specific branding on subdomains
- Better authentication flow
- Business credibility for partnerships

Your application is ready - just need to complete the domain connection!