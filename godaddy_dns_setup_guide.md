# GoDaddy DNS Setup for get_perk.co

## Step 1: Deploy on Replit First
1. Click "Deploy" in your Replit workspace
2. Note your deployment URL (e.g., `get-perkd-abc123.replit.app`)

## Step 2: GoDaddy DNS Configuration

### Access DNS Management:
1. Login to GoDaddy account
2. Go to "My Products" → "Domain"  
3. Click "DNS" next to get_perk.co
4. Click "Manage DNS"

### Required DNS Records:

#### Main Domain Records:
```
Type: A
Name: @
Value: [Replit will provide this IP]
TTL: 1 hour
```

```
Type: CNAME  
Name: www
Value: [your-deployment].replit.app
TTL: 1 hour
```

#### Campus Subdomain Records:
Add these CNAME records for each campus:

```
Type: CNAME | Name: utsa | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: txst | Value: [your-deployment].replit.app | TTL: 1 hour  
Type: CNAME | Name: ut | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: uthsc | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: sac | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: nwv | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: pac | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: nlc | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: spc | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: stmu | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: tu | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: uiw | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: sci | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: hu | Value: [your-deployment].replit.app | TTL: 1 hour
Type: CNAME | Name: gu | Value: [your-deployment].replit.app | TTL: 1 hour
```

## Step 3: Add Domain to Replit
1. In Replit deployment dashboard
2. Go to "Domains" section
3. Click "Add Custom Domain"
4. Enter: `get_perk.co`
5. Follow Replit's verification steps

## Step 4: Test Deployment
After DNS propagation (5-60 minutes):
- Main site: `https://get_perk.co`
- UTSA campus: `https://utsa.get_perk.co`
- Test authentication with improved system

## Timeline:
- **Deploy**: Immediate
- **DNS Setup**: 5-10 minutes  
- **Propagation**: 5-60 minutes
- **SSL Certificate**: Automatic via Replit
- **Ready to test**: Within 1 hour

Your authentication improvements are ready for production testing on the custom domain!