# Custom Domain Setup for Get Perk'd

## Quick Domain Options

### Option 1: Use Replit's Built-in Custom Domain
1. Go to your Replit project settings
2. Click on "Domains" or "Custom Domain"
3. Enter your desired subdomain like: `getperkd.replit.app`
4. This gives you a cleaner URL immediately

### Option 2: Purchase a Custom Domain
**Recommended domains for Get Perk'd:**
- `getperkd.com` (primary choice)
- `getperkd.co` 
- `perkd.app`
- `getperks.app`

**Where to buy:**
- **Namecheap** - Affordable, good support
- **Cloudflare** - Great pricing, excellent DNS
- **Google Domains** - Simple setup
- **GoDaddy** - Popular, slightly more expensive

### Option 3: Quick Setup with Replit Deployments
1. In your Replit project, click "Deploy"
2. Choose "Autoscale Deployments"
3. You'll get a clean `.replit.app` domain automatically
4. Later add your custom domain through the deployment dashboard

## Campus-Specific Subdomains
Once you have your main domain, you can set up:
- `utsa.getperkd.com`
- `alamo.getperkd.com` 
- `txst.getperkd.com`
- `ut.getperkd.com`

## DNS Configuration
When you get your domain, point these records to your Replit deployment:
```
A Record: @ -> [Replit IP]
CNAME: www -> your-app.replit.app
CNAME: utsa -> your-app.replit.app
CNAME: alamo -> your-app.replit.app
```

## Current Status
Your app is ready for deployment with a custom domain. The subdomain detection system is already built and will work with any domain you choose.

## Immediate Action
For the quickest solution right now:
1. Deploy to Replit Deployments (gives you a clean `.replit.app` URL)
2. Later purchase `getperkd.com` for the permanent domain