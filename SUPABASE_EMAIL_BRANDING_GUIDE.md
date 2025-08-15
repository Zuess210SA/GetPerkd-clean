# Get Perk'd - Supabase Email Branding Setup

## Overview
Professional email branding configuration for investor meetings and production deployment.

## Supabase Dashboard Configuration Steps

### 1. Access Email Templates
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Email Templates**
3. Select each template to customize

### 2. Product Branding Updates

#### Product Name
```
Current: "Supabase Auth" or default name
Update to: Get Perk'd
```

#### Company Name
```
Get Perk'd
```

#### Product Description
```
The premier student discount platform connecting university students with local business deals
```

### 3. Logo Configuration
#### Logo Requirements
- **Format**: PNG or SVG
- **Size**: 200x80px recommended
- **Background**: Transparent preferred
- **Colors**: Blue (#2563eb) "Get" + Green (#10b981) "Perk'd"

#### Logo Upload Process
1. In email template settings, look for "Logo" or "Brand Image" section
2. Upload the Get Perk'd logo file
3. Set alt text: "Get Perk'd Logo"

### 4. Footer Customization
```
© 2025 Get Perk'd · Built with ❤️ in Texas

Connect with students across UTSA, Texas State, UT Austin, and Alamo Colleges.
Discover exclusive local deals and save money on campus essentials.

Questions? Contact us at support@getperkd.co
```

### 5. Email Template Customizations

#### Welcome Email Template
```
Subject: Welcome to Get Perk'd! 🎓

Hi {{.Name}},

Welcome to Get Perk'd - your gateway to exclusive student discounts!

You're now connected to deals from local businesses near your campus. Start exploring and saving money on food, entertainment, shopping, and more.

{{.ConfirmationURL}}

Ready to discover your first deal?
[Explore Deals](https://getperkd.co)

Thanks for joining the Get Perk'd community!

The Get Perk'd Team
© 2025 Get Perk'd · Built with ❤️ in Texas
```

#### Password Reset Template
```
Subject: Reset Your Get Perk'd Password

Hi there,

Someone requested a password reset for your Get Perk'd account.

If this was you, click the link below to reset your password:
{{.ConfirmationURL}}

If you didn't request this, you can safely ignore this email.

Need help? Contact us at support@getperkd.co

The Get Perk'd Team
© 2025 Get Perk'd · Built with ❤️ in Texas
```

#### Email Confirmation Template
```
Subject: Confirm Your Get Perk'd Email

Hi {{.Name}},

Thanks for signing up for Get Perk'd!

Please confirm your email address by clicking the link below:
{{.ConfirmationURL}}

Once confirmed, you'll have access to exclusive deals from local businesses near your campus.

Welcome to the community!

The Get Perk'd Team
© 2025 Get Perk'd · Built with ❤️ in Texas
```

### 6. Brand Color Scheme
```css
Primary Blue: #2563eb
Success Green: #10b981
Background: #f8f9fa
Text: #374151
Accent: #ef4444
```

### 7. Contact Information
```
Support Email: support@getperkd.co
Website: https://getperkd.co
Platform: Texas Student Discount Platform
```

## Validation Checklist

- [ ] Product name updated to "Get Perk'd"
- [ ] Logo uploaded and displays correctly
- [ ] Footer includes Texas branding
- [ ] All email templates customized
- [ ] Contact information updated
- [ ] Brand colors consistent
- [ ] Professional tone maintained

## Benefits for Investor Meetings

✅ **Professional Appearance**: Custom branding shows platform maturity  
✅ **Texas Identity**: "Built with ❤️ in Texas" reinforces local market focus  
✅ **User Experience**: Consistent branding across authentication flows  
✅ **Credibility**: Custom domain + professional emails = legitimate business  
✅ **Brand Recognition**: Users associate emails with Get Perk'd, not generic Supabase  

## Testing Email Templates

After configuration, test each email template:

1. **Welcome Email**: Create a new test account
2. **Password Reset**: Use "Forgot Password" feature
3. **Email Confirmation**: Check confirmation flow

## Deployment Status

This configuration enhances the professional appearance for:
- New user signups during campus rollout
- Investor demonstrations showing complete user experience
- Production deployment with branded communications
- Business partner credibility during merchant onboarding

The email branding completes the professional presentation layer for August 1st launch readiness.