# Restart Domain Verification Process

## DNS Status with 600 Second TTL:
✅ Records updated in GoDaddy
✅ TTL set to 600 seconds (10 minutes) 
✅ Ready for verification restart

## How to Restart Verification:

### Option 1: Replit Dashboard
1. Go to your Replit deployment settings
2. Navigate to Custom Domain section  
3. Click "Retry Verification" or "Check DNS" button
4. If available, click "Re-verify" next to your domain

### Option 2: Remove and Re-add
If no retry option exists:
1. **Remove** getperkd.co from custom domains
2. **Wait 2-3 minutes** for cache to clear
3. **Re-add** getperkd.co as custom domain
4. Follow the verification prompts

### Option 3: Contact Support
If verification still fails:
- Check Replit Help docs for domain verification
- Submit support ticket with your domain details

## Expected Timeline:
- **TTL 600 seconds**: Changes propagate within 10 minutes
- **Verification**: Usually takes 2-5 minutes after DNS propagation
- **Total time**: 15-20 minutes from DNS update

## Check Propagation First:
Before restarting verification, confirm DNS is propagated:
1. **dnschecker.org** - Enter getperkd.co
2. Look for green checkmarks globally
3. Verify your A record IP matches what Replit expects

## Next Steps:
1. Check DNS propagation status
2. Restart verification in Replit
3. Your domain should verify successfully within 15-20 minutes