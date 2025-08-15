# Replit A Record Configuration for getperkd.co

## How Replit A Records Work:

Replit doesn't use static IP addresses. Instead, they generate specific A records for each deployment when you link a custom domain.

## Step-by-Step Process:

### Step 1: Link Domain in Replit
1. Go to your Replit deployment dashboard
2. Click "Link Domain" or "Custom Domain"
3. Enter `getperkd.co` (without www)
4. Replit will generate specific DNS records for you

### Step 2: Replit Provides Records
After entering your domain, Replit will show you something like:

```
A Record:
Type: A
Name: @
Value: [Specific IP - like 142.250.XXX.XXX]
TTL: 300 (or Auto)

TXT Record (for verification):
Type: TXT  
Name: @
Value: replit-domain-verification=xxxxxxxxxxxxxxxx
```

### Step 3: Add Records to GoDaddy
Use the exact IP address Replit provides:

```
Type: A
Name: @  
Value: [IP address from Replit]
TTL: 1/2 Hour

Type: TXT
Name: @
Value: [verification string from Replit]  
TTL: 1/2 Hour
```

### Step 4: Campus Subdomains
For campus subdomains, you can still use CNAME:

```
Type: CNAME
Name: utsa
Value: student-perks-robertmcveigh19.replit.app
TTL: 1/2 Hour

Type: CNAME  
Name: txst
Value: student-perks-robertmcveigh19.replit.app
TTL: 1/2 Hour
```

## Important Notes:
- **Dynamic IPs**: The IP address is unique to your deployment
- **No Generic IP**: There's no single "Replit IP" to use
- **Verification Required**: Both A and TXT records needed
- **Wait Time**: DNS propagation takes 15 minutes to 48 hours

## Current Action Needed:
Go to your Replit deployment settings and start the custom domain linking process with `getperkd.co` - Replit will provide the exact A record IP address you need.