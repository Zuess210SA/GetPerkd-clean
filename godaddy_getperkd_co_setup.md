# Connect getperkd.co from GoDaddy to Get Perk'd

## Your Deployment Details ✅
**Live URL**: `https://student-perks-robertmcveigh19.replit.app`
**Target Domain**: `getperkd.co`

## Step 1: Add Custom Domain in Replit

1. In your deployment dashboard, click **"Domains"** tab
2. Click **"Add Custom Domain"** 
3. Enter: `getperkd.co`
4. Click **"Add Domain"**

## Step 2: Configure GoDaddy DNS

### Access GoDaddy DNS Manager:
1. Login to GoDaddy account
2. Go to **"My Products"** → Find **getperkd.co**
3. Click **"DNS"** → **"Manage DNS"**

### Add These DNS Records:

#### Main Domain Records:
```
Type: CNAME
Name: @
Value: student-perks-robertmcveigh19.replit.app
TTL: 1 Hour
```

```
Type: CNAME  
Name: www
Value: student-perks-robertmcveigh19.replit.app
TTL: 1 Hour
```

#### Campus Subdomain Records:
Add each of these CNAME records:

```
Name: utsa  → Value: student-perks-robertmcveigh19.replit.app
Name: txst  → Value: student-perks-robertmcveigh19.replit.app  
Name: ut    → Value: student-perks-robertmcveigh19.replit.app
Name: uthsc → Value: student-perks-robertmcveigh19.replit.app
Name: sac   → Value: student-perks-robertmcveigh19.replit.app
Name: nwv   → Value: student-perks-robertmcveigh19.replit.app
Name: pac   → Value: student-perks-robertmcveigh19.replit.app
Name: nlc   → Value: student-perks-robertmcveigh19.replit.app
Name: spc   → Value: student-perks-robertmcveigh19.replit.app
Name: stmu  → Value: student-perks-robertmcveigh19.replit.app
Name: tu    → Value: student-perks-robertmcveigh19.replit.app
Name: uiw   → Value: student-perks-robertmcveigh19.replit.app
```

## Step 3: Test Your Professional URLs

After DNS propagation (10-30 minutes):

### Main Sites:
- https://getperkd.co
- https://www.getperkd.co

### Campus Sites:
- https://utsa.getperkd.co (UTSA-specific experience)
- https://txst.getperkd.co (Texas State)
- https://ut.getperkd.co (UT Austin)
- https://sac.getperkd.co (San Antonio College)

## Benefits:
- Professional domain instead of long Replit URL
- Campus-specific branding and theming
- Better authentication experience
- Business credibility for partnerships
- SEO benefits for each campus market

## Timeline:
- **Add domain in Replit**: 2 minutes
- **Configure GoDaddy DNS**: 5-10 minutes  
- **DNS Propagation**: 10-30 minutes
- **SSL Certificate**: Automatic
- **Total**: Ready in 15-45 minutes

Your authentication improvements will work perfectly on the custom domain!