# 📧 Saved Deals Weekend Reminder Email Templates

## English Template

### Subject Line
```
🗓 Don't forget your saved perks for this weekend!
```

### Email Body (HTML)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Weekend Perks Await!</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { max-width: 200px; height: auto; }
        .greeting { font-size: 18px; margin-bottom: 20px; }
        .deal-item { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #28a745; }
        .deal-title { font-weight: bold; color: #28a745; }
        .merchant-name { color: #666; font-size: 14px; }
        .cta-button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .tip { background: #fff3cd; padding: 10px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ffc107; }
        .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{logoUrl}}" alt="Get Perk'd" class="logo">
    </div>
    
    <div class="greeting">
        Hey {{firstName}},
    </div>
    
    <p>Making plans? You've got deals saved and ready to redeem 🎉</p>
    
    <p><strong>Here's what you've got lined up:</strong></p>
    
    <div class="deal-item">
        <div class="deal-title">👉 {{savedDeal1}}</div>
        <div class="merchant-name">at {{merchant1}}</div>
    </div>
    
    <div class="deal-item">
        <div class="deal-title">👉 {{savedDeal2}}</div>
        <div class="merchant-name">at {{merchant2}}</div>
    </div>
    
    <div class="deal-item">
        <div class="deal-title">👉 {{savedDeal3}}</div>
        <div class="merchant-name">at {{merchant3}}</div>
    </div>
    
    <div class="tip">
        📅 <strong>Tip:</strong> Some of these expire soon — don't miss out!
    </div>
    
    <p>Head to your dashboard to view and redeem saved perks:</p>
    <a href="{{dashboardLink}}" class="cta-button">View My Dashboard</a>
    
    <p>Stay Perk'd and have an awesome weekend 🙌</p>
    
    <div class="footer">
        — Your Get Perk'd Crew 💚
        <br><br>
        <a href="{{unsubscribeLink}}">Unsubscribe</a> | <a href="{{preferencesLink}}">Email Preferences</a>
    </div>
</body>
</html>
```

### Email Body (Plain Text)
```
Hey {{firstName}},

Making plans? You've got deals saved and ready to redeem!

Here's what you've got lined up:
👉 {{savedDeal1}} at {{merchant1}}
👉 {{savedDeal2}} at {{merchant2}}
👉 {{savedDeal3}} at {{merchant3}}

📅 Tip: Some of these expire soon — don't miss out!

Head to your dashboard to view and redeem saved perks:
{{dashboardLink}}

Stay Perk'd and have an awesome weekend!

— Your Get Perk'd Crew 💚

Unsubscribe: {{unsubscribeLink}}
Email Preferences: {{preferencesLink}}
```

## Spanish Template

### Subject Line
```
🗓 ¡No olvides tus ofertas guardadas para este fin de semana!
```

### Email Body (HTML)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Tus ofertas del fin de semana te esperan!</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { max-width: 200px; height: auto; }
        .greeting { font-size: 18px; margin-bottom: 20px; }
        .deal-item { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #28a745; }
        .deal-title { font-weight: bold; color: #28a745; }
        .merchant-name { color: #666; font-size: 14px; }
        .cta-button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .tip { background: #fff3cd; padding: 10px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ffc107; }
        .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{logoUrl}}" alt="Get Perk'd" class="logo">
    </div>
    
    <div class="greeting">
        Hola {{firstName}},
    </div>
    
    <p>¿Haciendo planes? Tienes ofertas guardadas listas para usar 🎉</p>
    
    <p><strong>Esto es lo que tienes:</strong></p>
    
    <div class="deal-item">
        <div class="deal-title">👉 {{savedDeal1}}</div>
        <div class="merchant-name">en {{merchant1}}</div>
    </div>
    
    <div class="deal-item">
        <div class="deal-title">👉 {{savedDeal2}}</div>
        <div class="merchant-name">en {{merchant2}}</div>
    </div>
    
    <div class="deal-item">
        <div class="deal-title">👉 {{savedDeal3}}</div>
        <div class="merchant-name">en {{merchant3}}</div>
    </div>
    
    <div class="tip">
        📅 <strong>Consejo:</strong> ¡Algunas vencen pronto, no te las pierdas!
    </div>
    
    <p>Ingresa a tu panel para ver y canjear tus ofertas guardadas:</p>
    <a href="{{dashboardLink}}" class="cta-button">Ver Mi Panel</a>
    
    <p>Mantente Perk'd y que tengas un excelente fin de semana 🙌</p>
    
    <div class="footer">
        — Tu equipo de Get Perk'd 💚
        <br><br>
        <a href="{{unsubscribeLink}}">Cancelar suscripción</a> | <a href="{{preferencesLink}}">Preferencias de email</a>
    </div>
</body>
</html>
```

### Email Body (Plain Text)
```
Hola {{firstName}},

¿Haciendo planes? Tienes ofertas guardadas listas para usar!

Esto es lo que tienes:
👉 {{savedDeal1}} en {{merchant1}}
👉 {{savedDeal2}} en {{merchant2}}
👉 {{savedDeal3}} en {{merchant3}}

📅 Consejo: ¡Algunas vencen pronto, no te las pierdas!

Ingresa a tu panel para ver y canjear tus ofertas guardadas:
{{dashboardLink}}

Mantente Perk'd y que tengas un excelente fin de semana!

— Tu equipo de Get Perk'd 💚

Cancelar suscripción: {{unsubscribeLink}}
Preferencias de email: {{preferencesLink}}
```

## Template Variables

### Required Variables
- `{{firstName}}` - User's first name
- `{{savedDeal1}}` - Title of first saved deal
- `{{merchant1}}` - Name of first merchant
- `{{savedDeal2}}` - Title of second saved deal
- `{{merchant2}}` - Name of second merchant
- `{{savedDeal3}}` - Title of third saved deal
- `{{merchant3}}` - Name of third merchant
- `{{dashboardLink}}` - Link to user's dashboard
- `{{logoUrl}}` - URL to Get Perk'd logo
- `{{unsubscribeLink}}` - Unsubscribe URL
- `{{preferencesLink}}` - Email preferences URL

### Optional Variables
- `{{totalSavedDeals}}` - Total number of saved deals
- `{{expiringDeals}}` - Number of deals expiring soon
- `{{weekendSpecial}}` - Any special weekend promotion

## Implementation Notes

### Sending Logic
1. **Trigger**: Every Friday at 10:00 AM local time
2. **Audience**: Users with 1+ saved deals and email notifications enabled
3. **Minimum Deals**: Only send if user has at least 1 saved deal
4. **Maximum Deals**: Show up to 3 deals in email, mention total if more
5. **Expiration Filter**: Prioritize deals expiring within 7 days

### Personalization Strategy
1. **Deal Selection**: Show highest-value deals first
2. **Merchant Preference**: Prioritize followed merchants
3. **Category Matching**: Match user's preferred categories
4. **Location**: Show deals closest to user's location
5. **Timing**: Consider merchant hours and user activity patterns

### A/B Testing Ideas
- Subject line variations
- CTA button text and placement
- Deal display format (list vs cards)
- Send timing (Friday morning vs Thursday evening)
- Frequency (weekly vs bi-weekly)

### Analytics Tracking
- Open rates by language
- Click-through rates to dashboard
- Deal redemption rates from email
- Unsubscribe rates
- Device and client analytics

---

**Quote:** "This leaderboard isn't just for clout... it's fuel for hustle." — Get Perk'd™ Gamification System