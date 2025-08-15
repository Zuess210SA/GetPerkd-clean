# 🎯 URGENT: Supabase Email Branding Implementation

## Quick Setup Guide for Investor Demo

### Step 1: Access Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Settings** → **Email Templates**

### Step 2: Update Product Information
```
Product Name: Get Perk'd
Company Name: Get Perk'd
Website URL: https://getperkd.co
Support Email: support@getperkd.co
```

### Step 3: Logo Upload
**Available Logo Files:**
- `client/src/assets/get-perkd-logo.jpg` - Main logo (JPG format)
- `client/src/assets/logo.svg` - Vector logo (SVG format)
- `public/perk-icon.svg` - Icon version

**Recommended**: Use `get-perkd-logo.jpg` for email templates

### Step 4: Footer Configuration
```
© 2025 Get Perk'd · Built with ❤️ in Texas

Connecting students across UTSA, Texas State, UT Austin & Alamo Colleges
with exclusive local business deals.
```

### Step 5: Email Template Updates

#### Confirmation Email Subject
```
Confirm Your Get Perk'd Account 🎓
```

#### Welcome Email Subject  
```
Welcome to Get Perk'd - Start Saving! 💰
```

#### Password Reset Subject
```
Reset Your Get Perk'd Password
```

### Step 6: Custom Email Content
```html
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="text-align: center; padding: 20px; background: #f8f9fa;">
    <img src="[LOGO_URL]" alt="Get Perk'd" style="height: 60px;">
  </div>
  
  <div style="padding: 30px 20px; background: white;">
    <h2 style="color: #2563eb; margin-bottom: 20px;">Welcome to Get Perk'd!</h2>
    
    <p style="color: #374151; line-height: 1.6;">
      You're now connected to exclusive student discounts from local businesses 
      near your campus. Start exploring deals and saving money on everything 
      from food to entertainment!
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{.ConfirmationURL}}" 
         style="background: #2563eb; color: white; padding: 12px 30px; 
                text-decoration: none; border-radius: 6px; display: inline-block;">
        Confirm Your Account
      </a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px;">
      Questions? Reply to this email or contact us at support@getperkd.co
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; background: #f8f9fa; 
              color: #6b7280; font-size: 12px;">
    © 2025 Get Perk'd · Built with ❤️ in Texas<br>
    <a href="https://getperkd.co" style="color: #2563eb;">getperkd.co</a>
  </div>
</div>
```

## Quick Checklist for Investor Meeting

- [ ] **Product Name**: Changed from "Supabase Auth" to "Get Perk'd"
- [ ] **Logo**: Uploaded `get-perkd-logo.jpg` to email templates  
- [ ] **Footer**: Added "Built with ❤️ in Texas" branding
- [ ] **Colors**: Updated to match Get Perk'd brand (blue #2563eb)
- [ ] **Contact**: Updated support email to support@getperkd.co
- [ ] **Testing**: Sent test emails to verify branding appears correctly

## Benefits for August 1st Launch

✅ **Professional Credibility**: Custom emails show platform maturity  
✅ **Brand Consistency**: Matches website and app branding  
✅ **Texas Identity**: Reinforces local market positioning  
✅ **Investor Confidence**: Complete user experience from signup to dashboard  
✅ **User Trust**: Branded communications increase user confidence  

## Testing the Implementation

1. Create a test account with a new email
2. Check the welcome email for proper branding
3. Test password reset flow
4. Verify all templates show "Get Perk'd" instead of "Supabase"

## Time Estimate
**5-10 minutes** to implement all branding changes in Supabase dashboard.

This professional email branding completes the investor-ready user experience for your August 1st launch and $400K funding meetings.