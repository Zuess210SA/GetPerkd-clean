# Connect get_perkd.com from GoDaddy to Your Get Perk'd App

## Step 1: Deploy Your Application First

1. **In your Replit workspace**, click the **"Deploy"** button
2. **Choose "Autoscale Deployments"**
3. **Wait for deployment** to complete
4. **Copy your deployment URL** (will be something like `get-perkd-abc123.replit.app`)

## Step 2: Configure DNS in GoDaddy

### Access GoDaddy DNS Manager:
1. Login to your GoDaddy account
2. Go to **"My Products"** → **"All Products and Services"**
3. Find **get_perkd.com** and click **"DNS"**
4. Click **"Manage DNS"**

### Add These DNS Records:

#### For Main Domain (get_perkd.com):
```
Type: CNAME
Name: @
Value: [your-deployment-url].replit.app
TTL: 1 Hour
```

#### For www subdomain:
```
Type: CNAME  
Name: www
Value: [your-deployment-url].replit.app
TTL: 1 Hour
```

#### For Campus Subdomains:
Add each of these CNAME records:

```
Name: utsa     | Value: [your-deployment-url].replit.app
Name: txst     | Value: [your-deployment-url].replit.app  
Name: ut       | Value: [your-deployment-url].replit.app
Name: uthsc    | Value: [your-deployment-url].replit.app
Name: sac      | Value: [your-deployment-url].replit.app
Name: nwv      | Value: [your-deployment-url].replit.app
Name: pac      | Value: [your-deployment-url].replit.app
Name: nlc      | Value: [your-deployment-url].replit.app
Name: spc      | Value: [your-deployment-url].replit.app
Name: stmu     | Value: [your-deployment-url].replit.app
Name: tu       | Value: [your-deployment-url].replit.app
Name: uiw      | Value: [your-deployment-url].replit.app
Name: sci      | Value: [your-deployment-url].replit.app
Name: hu       | Value: [your-deployment-url].replit.app
Name: gu       | Value: [your-deployment-url].replit.app
```

## Step 3: Add Custom Domain in Replit

1. **In your Replit deployment dashboard**
2. **Navigate to your deployed app**
3. **Click "Domains" tab**
4. **Click "Add Custom Domain"**
5. **Enter**: `get_perkd.com`
6. **Click "Add Domain"**
7. **Repeat for**: `www.get_perkd.com`

## Step 4: Verification & SSL

- **DNS Propagation**: 5-60 minutes (usually 10-15 minutes)
- **SSL Certificate**: Automatic via Replit (takes 5-15 minutes after DNS)
- **Verification**: Replit will automatically verify domain ownership

## Step 5: Test Your Domains

After DNS propagation, test these URLs:

### Main Sites:
- https://get_perkd.com
- https://www.get_perkd.com

### Campus Sites:
- https://utsa.get_perkd.com (UTSA students)
- https://txst.get_perkd.com (Texas State)
- https://ut.get_perkd.com (UT Austin)
- https://sac.get_perkd.com (San Antonio College)

## Step 6: Update Application Settings

Once domains are working, you may need to update:

1. **Supabase redirect URLs** (if using OAuth)
2. **Stripe webhook URLs** 
3. **SendGrid/Twilio callback URLs**

## Timeline:
- **Deploy**: 2-5 minutes
- **DNS Setup**: 5-10 minutes
- **Propagation**: 5-60 minutes  
- **SSL Certificate**: Automatic
- **Total Time**: Usually ready in 15-30 minutes

## Troubleshooting:

**If domain doesn't work:**
- Check DNS propagation: https://dnschecker.org
- Verify CNAME records point to correct .replit.app URL
- Wait longer for propagation (up to 48 hours max)
- Clear browser cache

**If SSL certificate issues:**
- Wait 15-30 minutes after DNS propagation
- Replit automatically handles SSL certificates
- Contact Replit support if issues persist

Your authentication system improvements will work perfectly on the custom domain!