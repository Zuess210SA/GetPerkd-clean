# 📧 Final Launch Notification Templates
## Get Perk'd - August 1st, 2025 Launch

### Template Overview
Complete set of professional notification templates for all user types and scenarios, supporting both English and Spanish for LATAM expansion.

---

## 🎓 STUDENT TEMPLATES

### 1. Welcome Email - Student
**Subject:** Welcome to Get Perk'd! 🎉 Your exclusive student discounts await

**HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Get Perk'd!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
    <h1 style="margin: 0; font-size: 28px;">Welcome to Get Perk'd!</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your exclusive student discount platform</p>
  </div>
  
  <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
    <h2 style="color: #3B82F6; margin-top: 0;">🎉 You're all set, {{studentName}}!</h2>
    <p>Welcome to the exclusive student discount community at UTSA! Get ready to save on everything from food and entertainment to shopping and services.</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #10B981; margin-top: 0;">🚀 Get Started in 3 Steps:</h3>
      <ol style="padding-left: 20px;">
        <li><strong>Browse Deals:</strong> Check out 50+ exclusive discounts from local San Antonio businesses</li>
        <li><strong>Save Your Favorites:</strong> Bookmark deals you love and get notified before they expire</li>
        <li><strong>Start Saving:</strong> Show your phone to redeem deals instantly</li>
      </ol>
    </div>
  </div>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="{{appUrl}}" style="background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Start Browsing Deals</a>
  </div>
  
  <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="color: #1565c0; margin-top: 0;">💡 Pro Tips:</h3>
    <ul style="padding-left: 20px;">
      <li>Follow your favorite businesses to get their deals first</li>
      <li>Enable notifications to never miss a great deal</li>
      <li>Check the app daily for new exclusive offers</li>
    </ul>
  </div>
  
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  
  <div style="text-align: center; color: #666; font-size: 14px;">
    <p>Have questions? Reply to this email or visit our <a href="{{helpUrl}}" style="color: #3B82F6;">help center</a></p>
    <p>Get Perk'd Team<br>San Antonio, TX</p>
    <p style="margin-top: 20px;">
      <a href="{{unsubscribeUrl}}" style="color: #888; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>
```

### 2. Daily Digest Email - Student
**Subject:** Your Daily Perks 🎯 {{dealCount}} exclusive deals waiting for you

**HTML Template:**
```html
<div style="background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
  <h2 style="margin: 0;">🎉 Your Daily Perks</h2>
  <p style="margin: 5px 0 0 0; opacity: 0.9;">{{dealCount}} deals picked just for you</p>
</div>

<div style="margin-bottom: 25px;">
  <h3 style="color: #3B82F6;">⭐ Top Deals Today:</h3>
  {{#topDeals}}
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
    <div style="display: flex; justify-content: space-between; align-items: start;">
      <div>
        <h4 style="margin: 0 0 5px 0; color: #1f2937;">{{title}}</h4>
        <p style="margin: 0; color: #6b7280; font-size: 14px;">{{businessName}}</p>
      </div>
      <div style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">
        {{discountPercent}}% OFF
      </div>
    </div>
    <p style="margin: 10px 0 0 0; color: #4b5563; font-size: 14px;">{{reason}}</p>
  </div>
  {{/topDeals}}
</div>

<div style="text-align: center; margin: 25px 0;">
  <a href="{{appUrl}}" style="background: #3B82F6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">View All Deals</a>
</div>
```

### 3. Push Notification - Student
**New Deal Alert:**
```json
{
  "headings": {"en": "🔥 New Deal Alert!", "es": "🔥 ¡Nueva Oferta!"},
  "contents": {
    "en": "{{businessName}} just posted {{discountPercent}}% off {{category}}! Tap to save.",
    "es": "¡{{businessName}} acaba de publicar {{discountPercent}}% de descuento en {{category}}! Toca para guardar."
  },
  "url": "{{appUrl}}/deals/{{dealId}}",
  "large_icon": "{{businessLogo}}",
  "big_picture": "{{dealImage}}"
}
```

**Daily Digest Push:**
```json
{
  "headings": {"en": "Your Daily Perks 🎯", "es": "Tus Ofertas Diarias 🎯"},
  "contents": {
    "en": "{{dealCount}} exclusive deals waiting for you. Don't miss out!",
    "es": "{{dealCount}} ofertas exclusivas te esperan. ¡No te las pierdas!"
  },
  "url": "{{appUrl}}/digest",
  "big_picture": "{{digestImage}}"
}
```

### 4. SMS - Student
**Deal Expiration Warning:**
```
🚨 Your saved deal expires in 2 hours!
{{businessName}}: {{discountPercent}}% off
Redeem now: {{shortUrl}}
Reply STOP to opt out
```

**Spanish Version:**
```
🚨 ¡Tu oferta guardada expira en 2 horas!
{{businessName}}: {{discountPercent}}% de descuento
Canjea ahora: {{shortUrl}}
Responde STOP para cancelar
```

---

## 🏢 MERCHANT TEMPLATES

### 1. Welcome Email - Merchant
**Subject:** Welcome to Get Perk'd! 🚀 Your business growth partner

**HTML Template:**
```html
<div style="background: linear-gradient(135deg, #10B981 0%, #3B82F6 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
  <h1 style="margin: 0; font-size: 28px;">Welcome to Get Perk'd!</h1>
  <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your student customer acquisition platform</p>
</div>

<div style="background: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
  <h2 style="color: #15803d; margin-top: 0;">🎉 Welcome {{businessName}}!</h2>
  <p>You're now part of San Antonio's premier student discount platform. Get ready to connect with thousands of UTSA students and grow your business.</p>
  
  <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #3B82F6; margin-top: 0;">🚀 Your Success Journey:</h3>
    <ol style="padding-left: 20px;">
      <li><strong>Complete Your Profile:</strong> Add your business info, hours, and logo</li>
      <li><strong>Create Your First Deal:</strong> Use our AI recommendations for maximum impact</li>
      <li><strong>Go Live:</strong> Start attracting student customers immediately</li>
    </ol>
  </div>
</div>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{dashboardUrl}}" style="background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Complete Setup</a>
</div>

<div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
  <h3 style="color: #1e40af; margin-top: 0;">💡 Success Tips:</h3>
  <ul style="padding-left: 20px;">
    <li>Start with a 15-20% discount to attract first customers</li>
    <li>Use our AI recommendations for optimal deal timing</li>
    <li>Track your performance on the merchant leaderboard</li>
  </ul>
</div>
```

### 2. AI Deal Recommendation Email - Merchant
**Subject:** 🤖 New AI recommendations to boost your sales

**HTML Template:**
```html
<div style="background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%); color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
  <h2 style="margin: 0;">🤖 AI Deal Recommendations</h2>
  <p style="margin: 5px 0 0 0; opacity: 0.9;">Personalized suggestions for {{businessName}}</p>
</div>

<div style="margin-bottom: 25px;">
  <h3 style="color: #8B5CF6;">⭐ Recommended for You:</h3>
  {{#recommendations}}
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
      <h4 style="margin: 0; color: #1f2937;">{{title}}</h4>
      <div style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">
        {{confidence}}% confidence
      </div>
    </div>
    <p style="margin: 0 0 15px 0; color: #4b5563;">{{description}}</p>
    <div style="background: #f9fafb; padding: 15px; border-radius: 6px;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Expected Impact:</strong> {{expectedImpact}}</p>
      <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;"><strong>Why this works:</strong> {{reasoning}}</p>
    </div>
  </div>
  {{/recommendations}}
</div>

<div style="text-align: center; margin: 25px 0;">
  <a href="{{dashboardUrl}}/ai-recommendations" style="background: #8B5CF6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">View All Recommendations</a>
</div>
```

### 3. Leaderboard Ranking Push - Merchant
**Rank Up Notification:**
```json
{
  "headings": {"en": "🏆 You're Moving Up!", "es": "🏆 ¡Estás Subiendo!"},
  "contents": {
    "en": "{{businessName}} just moved to #{{newRank}} on the leaderboard! Keep it up!",
    "es": "¡{{businessName}} acaba de subir al #{{newRank}} en la tabla de posiciones! ¡Sigue así!"
  },
  "url": "{{dashboardUrl}}/leaderboard",
  "large_icon": "{{businessLogo}}"
}
```

---

## 🏛️ FRANCHISEE TEMPLATES

### 1. Welcome Email - Franchisee
**Subject:** Welcome to Get Perk'd Enterprise! 🌟 Multi-location success starts here

**HTML Template:**
```html
<div style="background: linear-gradient(135deg, #7C3AED 0%, #10B981 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
  <h1 style="margin: 0; font-size: 28px;">Welcome to Get Perk'd Enterprise!</h1>
  <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Multi-location student engagement platform</p>
</div>

<div style="background: #f5f3ff; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
  <h2 style="color: #7C3AED; margin-top: 0;">🎉 Welcome {{franchiseName}}!</h2>
  <p>You're now equipped with enterprise-grade tools to manage multiple locations and dominate your market with student customers.</p>
  
  <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #10B981; margin-top: 0;">🚀 Enterprise Features:</h3>
    <ul style="padding-left: 20px;">
      <li><strong>Territory Management:</strong> Manage all locations from one dashboard</li>
      <li><strong>Cross-Location Analytics:</strong> Compare performance across your network</li>
      <li><strong>Coordinated Marketing:</strong> Launch campaigns across multiple locations</li>
      <li><strong>Advanced Reporting:</strong> Deep insights into regional performance</li>
    </ul>
  </div>
</div>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{franchiseeDashboardUrl}}" style="background: #7C3AED; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Access Enterprise Dashboard</a>
</div>
```

### 2. Territory Performance Report - Franchisee
**Subject:** 📊 Weekly Territory Performance Report

**HTML Template:**
```html
<div style="background: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%); color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
  <h2 style="margin: 0;">📊 Territory Performance Report</h2>
  <p style="margin: 5px 0 0 0; opacity: 0.9;">Week of {{weekStartDate}} - {{weekEndDate}}</p>
</div>

<div style="margin-bottom: 25px;">
  <h3 style="color: #7C3AED;">🏆 Top Performing Locations:</h3>
  {{#topLocations}}
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h4 style="margin: 0; color: #1f2937;">{{locationName}}</h4>
        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">{{address}}</p>
      </div>
      <div style="text-align: right;">
        <div style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">
          {{redemptions}} redemptions
        </div>
        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">{{conversionRate}}% conversion</p>
      </div>
    </div>
  </div>
  {{/topLocations}}
</div>

<div style="text-align: center; margin: 25px 0;">
  <a href="{{franchiseeDashboardUrl}}/analytics" style="background: #7C3AED; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Full Report</a>
</div>
```

---

## 🛡️ ADMIN TEMPLATES

### 1. System Alert Email - Admin
**Subject:** 🚨 System Alert: {{alertType}} - {{severity}}

**HTML Template:**
```html
<div style="background: linear-gradient(135deg, #EF4444 0%, #F97316 100%); color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
  <h2 style="margin: 0;">🚨 System Alert</h2>
  <p style="margin: 5px 0 0 0; opacity: 0.9;">{{alertType}} - {{severity}}</p>
</div>

<div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
  <h3 style="color: #DC2626; margin-top: 0;">Alert Details:</h3>
  <ul style="padding-left: 20px;">
    <li><strong>Time:</strong> {{timestamp}}</li>
    <li><strong>Component:</strong> {{component}}</li>
    <li><strong>Description:</strong> {{description}}</li>
    <li><strong>Impact:</strong> {{impact}}</li>
  </ul>
</div>

<div style="text-align: center; margin: 25px 0;">
  <a href="{{adminDashboardUrl}}" style="background: #EF4444; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Admin Dashboard</a>
</div>
```

---

## 🌍 SPANISH TEMPLATES (LATAM)

### 1. Correo de Bienvenida - Estudiante
**Asunto:** ¡Bienvenido a Get Perk'd! 🎉 Tus descuentos exclusivos te esperan

**Template HTML:**
```html
<div style="background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
  <h1 style="margin: 0; font-size: 28px;">¡Bienvenido a Get Perk'd!</h1>
  <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Tu plataforma exclusiva de descuentos estudiantiles</p>
</div>

<div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
  <h2 style="color: #3B82F6; margin-top: 0;">🎉 ¡Todo listo, {{studentName}}!</h2>
  <p>¡Bienvenido a la comunidad exclusiva de descuentos estudiantiles! Prepárate para ahorrar en todo, desde comida y entretenimiento hasta compras y servicios.</p>
  
  <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #10B981; margin-top: 0;">🚀 Comienza en 3 pasos:</h3>
    <ol style="padding-left: 20px;">
      <li><strong>Explora Ofertas:</strong> Descubre 50+ descuentos exclusivos de negocios locales</li>
      <li><strong>Guarda tus Favoritas:</strong> Marca las ofertas que te gustan y recibe notificaciones antes de que expiren</li>
      <li><strong>Empieza a Ahorrar:</strong> Muestra tu teléfono para canjear ofertas al instante</li>
    </ol>
  </div>
</div>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{appUrl}}" style="background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Explorar Ofertas</a>
</div>
```

### 2. Push Notification - Merchant (Spanish)
**Nueva Recomendación IA:**
```json
{
  "headings": {"es": "🤖 Nueva Recomendación IA"},
  "contents": {
    "es": "Tenemos nuevas sugerencias personalizadas para {{businessName}}. ¡Aumenta tus ventas hasta un {{expectedIncrease}}%!"
  },
  "url": "{{dashboardUrl}}/ai-recommendations",
  "large_icon": "{{businessLogo}}"
}
```

---

## 📱 SPECIALIZED TEMPLATES

### 1. Redemption Confirmation - All Users
**Push Notification:**
```json
{
  "headings": {"en": "✅ Deal Redeemed!", "es": "✅ ¡Oferta Canjeada!"},
  "contents": {
    "en": "You saved {{savedAmount}} at {{businessName}}! Thanks for using Get Perk'd.",
    "es": "¡Ahorraste {{savedAmount}} en {{businessName}}! Gracias por usar Get Perk'd."
  },
  "url": "{{appUrl}}/redemptions",
  "large_icon": "{{businessLogo}}"
}
```

### 2. Re-engagement Campaign - Inactive Users
**Subject:** We miss you! 💔 Here's 25% off your next purchase

**HTML Template:**
```html
<div style="background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%); color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
  <h2 style="margin: 0;">💔 We Miss You!</h2>
  <p style="margin: 5px 0 0 0; opacity: 0.9;">Come back to Get Perk'd</p>
</div>

<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
  <h3 style="color: #92400e; margin-top: 0;">🎁 Special Comeback Offer:</h3>
  <p>We noticed you haven't been active lately. Here's an exclusive 25% off deal to welcome you back!</p>
  
  <div style="background: white; padding: 15px; border-radius: 6px; margin: 15px 0;">
    <h4 style="margin: 0; color: #1f2937;">{{comebackDealTitle}}</h4>
    <p style="margin: 5px 0; color: #6b7280;">{{comebackDealDescription}}</p>
    <p style="margin: 5px 0 0 0; color: #92400e; font-weight: bold;">Use code: COMEBACK25</p>
  </div>
</div>

<div style="text-align: center; margin: 25px 0;">
  <a href="{{appUrl}}/comeback" style="background: #F59E0B; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">Claim Your Offer</a>
</div>
```

---

## 🎯 CAMPAIGN TEMPLATES

### 1. Launch Week Campaign
**Subject:** 🚀 Get Perk'd is LIVE! First 1000 students get exclusive perks

**HTML Template:**
```html
<div style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
  <h1 style="margin: 0; font-size: 32px;">🚀 WE'RE LIVE!</h1>
  <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Get Perk'd is officially launched in San Antonio!</p>
</div>

<div style="background: #fef7ff; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
  <h2 style="color: #8B5CF6; margin-top: 0;">🎉 Launch Week Special!</h2>
  <p>Be among the first 1000 students to join and unlock exclusive founding member perks:</p>
  
  <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #EC4899; margin-top: 0;">🎁 Founding Member Benefits:</h3>
    <ul style="padding-left: 20px;">
      <li><strong>Exclusive Badge:</strong> Show off your founding member status</li>
      <li><strong>Early Access:</strong> Get new deals 24 hours before everyone else</li>
      <li><strong>Bonus Rewards:</strong> Extra points for every redemption</li>
      <li><strong>VIP Support:</strong> Priority customer service</li>
    </ul>
  </div>
</div>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{appUrl}}/launch-special" style="background: #8B5CF6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Claim Founding Member Status</a>
</div>
```

---

## 📊 ANALYTICS & REPORTING

### Template Performance Tracking
- **Open Rate Target:** 25-35%
- **Click-through Rate Target:** 3-8%
- **Conversion Rate Target:** 1-3%
- **Unsubscribe Rate Target:** <0.5%

### A/B Testing Variables
- Subject line variations
- CTA button colors and text
- Email send times
- Personalization levels
- Template layouts

### Segmentation Strategy
- **Students:** By university, graduation year, interests
- **Merchants:** By business type, subscription tier, performance
- **Franchisees:** By territory size, location count
- **Geographic:** By city, state, country (for LATAM expansion)

---

## 🔧 TECHNICAL IMPLEMENTATION

### Integration Points
- **SendGrid:** Email template management and delivery
- **Twilio:** SMS template management and delivery
- **OneSignal:** Push notification template management
- **Database:** Template versioning and user preferences
- **Analytics:** Template performance tracking

### Template Variables
Common variables used across all templates:
- `{{userName}}` - User's display name
- `{{businessName}}` - Business name
- `{{dealTitle}}` - Deal title
- `{{discountPercent}}` - Discount percentage
- `{{appUrl}}` - Application URL
- `{{unsubscribeUrl}}` - Unsubscribe link
- `{{supportEmail}}` - Support email address

### Compliance Features
- **GDPR Compliance:** Clear unsubscribe links and data usage
- **CAN-SPAM Compliance:** Proper sender identification and opt-out
- **TCPA Compliance:** SMS opt-in and opt-out handling
- **Accessibility:** Alt text for images, proper heading structure

---

**Template Status:** Production Ready ✅  
**Last Updated:** July 17, 2025  
**Next Review:** July 25, 2025  
**Languages:** English, Spanish (LATAM optimized)