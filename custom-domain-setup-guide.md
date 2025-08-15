# Custom Domain Setup Guide for Get Perk'd

## Overview
After deploying your Get Perk'd platform on Replit, you can connect a custom domain to replace the default `.replit.app` URL.

## Step-by-Step Process

### 1. Deploy Your Application First
- Click the "Deploy" button in your Replit workspace
- Wait for the deployment to complete
- Note your default deployment URL (e.g., `get-perkd.username.replit.app`)

### 2. Access Domain Settings
1. Go to your Replit deployment dashboard
2. Navigate to your deployed application
3. Click on the "Domains" or "Custom Domain" section
4. Select "Add Custom Domain"

### 3. Configure Your Domain
**Domain Options:**
- `getperkd.com` (recommended for production)
- `app.getperkd.com` (for app-specific subdomain)
- `utsa.getperkd.com` (for campus-specific deployments)

### 4. DNS Configuration
You'll need to configure DNS records with your domain provider:

**For Root Domain (getperkd.com):**
```
Type: A
Name: @
Value: [Replit's IP address provided in dashboard]
TTL: 3600
```

**For Subdomain (app.getperkd.com):**
```
Type: CNAME
Name: app
Value: [your-deployment-url].replit.app
TTL: 3600
```

### 5. SSL Certificate
- Replit automatically provisions SSL certificates for custom domains
- This usually takes 5-15 minutes after DNS propagation
- Your site will be accessible via HTTPS

### 6. Verification Process
1. Add the domain in Replit dashboard
2. Configure DNS records with your provider
3. Wait for DNS propagation (usually 5-60 minutes)
4. Replit will verify domain ownership
5. SSL certificate will be issued automatically

## Recommended Domain Strategy

### Production Setup
- **Main App**: `app.getperkd.com`
- **Landing Page**: `getperkd.com`
- **Admin Panel**: `admin.getperkd.com`
- **API**: `api.getperkd.com`

### Campus-Specific Subdomains
- **UTSA**: `utsa.getperkd.com`
- **Texas State**: `txstate.getperkd.com`
- **UT Austin**: `ut.getperkd.com`
- **Alamo Colleges**: `alamo.getperkd.com`

## Important Notes

### Domain Provider Requirements
- You must own the domain through a registrar (GoDaddy, Namecheap, Google Domains, etc.)
- Have access to DNS management for the domain
- Domain must be active and not expired

### Propagation Time
- DNS changes can take 5 minutes to 48 hours to fully propagate
- Most changes are visible within 15-30 minutes
- Use tools like `dig` or online DNS checkers to verify

### Environment Variables
After custom domain setup, update any hardcoded URLs in your application:
- Update `VITE_APP_URL` in environment variables
- Update OAuth redirect URLs (if using social login)
- Update webhook URLs for Stripe/SendGrid/Twilio

## Post-Domain Setup Checklist

### 1. Update Application URLs
- [ ] Update base URL in environment variables
- [ ] Test all external integrations (Stripe, SendGrid, Twilio)
- [ ] Verify OAuth flows work with new domain
- [ ] Update any hardcoded URLs in codebase

### 2. SEO and Analytics
- [ ] Update Google Analytics property
- [ ] Submit new sitemap to Google Search Console
- [ ] Update social media links
- [ ] Update business listings and directories

### 3. SSL and Security
- [ ] Verify HTTPS is working
- [ ] Test SSL certificate validity
- [ ] Update security headers if needed
- [ ] Verify CORS settings work with new domain

## Troubleshooting

### Common Issues
1. **DNS not propagating**: Wait longer or check with DNS checker tools
2. **SSL not working**: Usually resolves automatically within 15 minutes
3. **404 errors**: Verify DNS CNAME points to correct Replit URL
4. **Mixed content warnings**: Update HTTP links to HTTPS

### Support Resources
- Replit Deployments documentation
- Your domain registrar's DNS help docs
- DNS propagation checker tools
- SSL certificate checker tools

## Cost Considerations
- Custom domains on Replit are included with paid plans
- Domain registration costs vary by provider ($10-15/year typical)
- SSL certificates are provided free by Replit
- No additional hosting costs beyond your Replit plan

## Launch Day Domain Plan
1. **Pre-launch**: Purchase domain and configure DNS
2. **Launch**: Deploy application on Replit
3. **Post-launch**: Add custom domain to deployment
4. **Marketing**: Update all materials with new domain

This setup ensures your Get Perk'd platform has a professional domain that students and merchants can easily remember and trust.