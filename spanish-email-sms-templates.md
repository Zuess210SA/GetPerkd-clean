# Spanish Email & SMS Templates

## Overview
Complete Spanish language templates for all Get Perk'd notification types to support LATAM expansion.

## Email Templates (Spanish)

### 1. Welcome Email for New Students
**Subject**: ¡Bienvenido a Get Perk'd! 🎓 Tu plataforma de descuentos estudiantiles

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bienvenido a Get Perk'd</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb;">¡Bienvenido a Get Perk'd!</h1>
            <p style="font-size: 18px; color: #10b981;">Tu plataforma de descuentos estudiantiles</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937;">¡Hola {{nombre}}!</h2>
            <p>Te damos la bienvenida a Get Perk'd, donde los estudiantes universitarios encuentran descuentos exclusivos de negocios locales.</p>
            
            <h3 style="color: #2563eb;">Cómo funciona:</h3>
            <ul>
                <li>📱 Explora ofertas exclusivas para estudiantes</li>
                <li>💾 Guarda las ofertas que te interesen</li>
                <li>🏪 Visita el negocio y muestra tu teléfono</li>
                <li>💰 ¡Disfruta tu descuento!</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{app_url}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Comenzar a Ahorrar</a>
            </div>
        </div>
        
        <div style="background: #ecfdf5; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #059669; margin-top: 0;">💡 Consejo:</h3>
            <p>Activa las notificaciones push para recibir alertas de nuevas ofertas y descuentos que expiran pronto.</p>
        </div>
        
        <div style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 30px;">
            <p>¿Necesitas ayuda? Contáctanos en <a href="mailto:soporte@getperkd.com">soporte@getperkd.com</a></p>
            <p>Get Perk'd - Conectando estudiantes con negocios locales</p>
        </div>
    </div>
</body>
</html>
```

### 2. Welcome Email for New Businesses
**Subject**: ¡Bienvenido a Get Perk'd! 🏪 Conecta con estudiantes universitarios

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bienvenido a Get Perk'd - Negocio</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb;">¡Bienvenido a Get Perk'd!</h1>
            <p style="font-size: 18px; color: #10b981;">Tu plataforma para conectar con estudiantes</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937;">¡Hola {{nombre_negocio}}!</h2>
            <p>Te damos la bienvenida a Get Perk'd, donde los negocios locales se conectan con estudiantes universitarios a través de ofertas exclusivas.</p>
            
            <h3 style="color: #2563eb;">Próximos pasos:</h3>
            <ol>
                <li>🏪 Completa tu perfil de negocio</li>
                <li>🎯 Crea tu primera oferta estudiantil</li>
                <li>👥 Invita a tu equipo (opcional)</li>
                <li>📊 Rastrea tu rendimiento</li>
            </ol>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{dashboard_url}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Ir al Panel de Control</a>
            </div>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #d97706; margin-top: 0;">🚀 Consejo de Lanzamiento:</h3>
            <p>Los negocios que crean ofertas con 20-30% de descuento ven las tasas de participación más altas entre estudiantes.</p>
        </div>
        
        <div style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 30px;">
            <p>¿Necesitas ayuda? Contáctanos en <a href="mailto:negocios@getperkd.com">negocios@getperkd.com</a></p>
            <p>Get Perk'd - Potenciando negocios locales</p>
        </div>
    </div>
</body>
</html>
```

### 3. Deal Notification Email
**Subject**: 🎉 Nueva oferta disponible: {{titulo_oferta}}

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nueva Oferta - Get Perk'd</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2563eb;">🎉 ¡Nueva Oferta Disponible!</h1>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
            <h2 style="color: #1f2937; margin-top: 0;">{{titulo_oferta}}</h2>
            <p style="font-size: 16px; color: #374151;">{{descripcion_oferta}}</p>
            
            <div style="display: flex; justify-content: space-between; margin: 15px 0;">
                <span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 14px;">{{categoria}}</span>
                <span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 14px; font-weight: bold;">{{descuento}}% OFF</span>
            </div>
            
            <p style="font-size: 14px; color: #6b7280;">
                <strong>Negocio:</strong> {{nombre_negocio}}<br>
                <strong>Válido hasta:</strong> {{fecha_vencimiento}}<br>
                <strong>Ubicación:</strong> {{ubicacion}}
            </p>
            
            <div style="text-align: center; margin: 20px 0;">
                <a href="{{oferta_url}}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Ver Oferta</a>
            </div>
        </div>
        
        <div style="background: #f9fafb; padding: 15px; border-radius: 6px; text-align: center; font-size: 14px; color: #6b7280;">
            <p>¿Ya no quieres recibir estas notificaciones? <a href="{{unsubscribe_url}}">Darse de baja</a></p>
        </div>
    </div>
</body>
</html>
```

### 4. Expiring Deal Reminder
**Subject**: ⏰ ¡Oferta expira pronto! {{titulo_oferta}}

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Oferta Expira Pronto - Get Perk'd</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #dc2626;">⏰ ¡Oferta Expira Pronto!</h1>
        </div>
        
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #dc2626;">
            <h2 style="color: #1f2937; margin-top: 0;">{{titulo_oferta}}</h2>
            <p style="font-size: 16px; color: #374151;">No pierdas esta oportunidad de ahorrar en {{nombre_negocio}}.</p>
            
            <div style="background: #fee2e2; padding: 10px; border-radius: 4px; margin: 15px 0;">
                <p style="margin: 0; font-weight: bold; color: #dc2626;">⚠️ Expira: {{fecha_vencimiento}}</p>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <a href="{{oferta_url}}" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Canjear Ahora</a>
            </div>
        </div>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; text-align: center;">
            <p style="margin: 0; color: #2563eb;">💡 Consejo: Guarda ofertas que te interesen para recibir recordatorios antes de que expiren.</p>
        </div>
    </div>
</body>
</html>
```

### 5. Redemption Confirmation
**Subject**: ✅ Confirmación de canje: {{titulo_oferta}}

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmación de Canje - Get Perk'd</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #10b981;">✅ ¡Canje Exitoso!</h1>
        </div>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
            <h2 style="color: #1f2937; margin-top: 0;">{{titulo_oferta}}</h2>
            <p style="font-size: 16px; color: #374151;">¡Gracias por usar Get Perk'd! Tu descuento ha sido aplicado exitosamente.</p>
            
            <div style="background: #dcfce7; padding: 15px; border-radius: 4px; margin: 15px 0;">
                <p style="margin: 0;"><strong>Negocio:</strong> {{nombre_negocio}}</p>
                <p style="margin: 0;"><strong>Descuento:</strong> {{descuento}}% OFF</p>
                <p style="margin: 0;"><strong>Fecha:</strong> {{fecha_canje}}</p>
                <p style="margin: 0;"><strong>Ahorro:</strong> ${{cantidad_ahorrada}}</p>
            </div>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 6px; text-align: center;">
            <h3 style="color: #d97706; margin-top: 0;">🌟 ¿Te gustó esta oferta?</h3>
            <p style="margin: 10px 0;">Sigue a {{nombre_negocio}} para recibir más ofertas exclusivas.</p>
            <a href="{{seguir_negocio_url}}" style="background: #d97706; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">Seguir Negocio</a>
        </div>
        
        <div style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 30px;">
            <p>¡Gracias por apoyar negocios locales!</p>
        </div>
    </div>
</body>
</html>
```

### 6. Daily Digest Email
**Subject**: 📱 Tu resumen diario Get Perk'd - {{fecha}}

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Resumen Diario - Get Perk'd</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2563eb;">📱 Tu Resumen Diario</h1>
            <p style="color: #6b7280;">{{fecha}}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">🎯 Ofertas Recomendadas Para Ti</h2>
            
            {{#cada_oferta}}
            <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #2563eb;">
                <h3 style="color: #1f2937; margin-top: 0;">{{titulo}}</h3>
                <p style="color: #6b7280; margin-bottom: 10px;">{{nombre_negocio}} • {{categoria}}</p>
                <p style="color: #374151;">{{descripcion}}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 14px; font-weight: bold;">{{descuento}}% OFF</span>
                    <a href="{{url_oferta}}" style="background: #2563eb; color: white; padding: 6px 12px; text-decoration: none; border-radius: 4px; font-size: 14px;">Ver Oferta</a>
                </div>
            </div>
            {{/cada_oferta}}
        </div>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; text-align: center; margin-bottom: 20px;">
            <h3 style="color: #2563eb; margin-top: 0;">📊 Tu Actividad</h3>
            <p style="margin: 5px 0;">Ofertas guardadas: {{ofertas_guardadas}}</p>
            <p style="margin: 5px 0;">Canjes este mes: {{canjes_mes}}</p>
            <p style="margin: 5px 0;">Ahorro total: ${{ahorro_total}}</p>
        </div>
        
        <div style="text-align: center; font-size: 14px; color: #6b7280;">
            <p><a href="{{configurar_url}}">Configurar preferencias</a> | <a href="{{darse_de_baja_url}}">Darse de baja</a></p>
        </div>
    </div>
</body>
</html>
```

## SMS Templates (Spanish)

### 1. New Deal SMS
```
🎉 Nueva oferta Get Perk'd: {{titulo}} en {{negocio}}. {{descuento}}% OFF hasta {{fecha}}. Ver: {{url_corta}}
```

### 2. Expiring Deal SMS
```
⏰ ¡Oferta expira hoy! {{titulo}} en {{negocio}}. {{descuento}}% OFF. Canjear: {{url_corta}}
```

### 3. Redemption Confirmation SMS
```
✅ Canje exitoso: {{titulo}} en {{negocio}}. Ahorraste ${{cantidad}}. ¡Gracias por usar Get Perk'd!
```

### 4. Daily Digest SMS
```
📱 Tu resumen Get Perk'd: {{cantidad}} nuevas ofertas disponibles. Las mejores: {{oferta_1}}, {{oferta_2}}. Ver todas: {{url_corta}}
```

### 5. Account Verification SMS
```
Tu código de verificación Get Perk'd: {{codigo}}. Válido por 10 minutos. No compartas este código.
```

### 6. Password Reset SMS
```
Restablece tu contraseña Get Perk'd con el código: {{codigo}}. Válido por 15 minutos. Soporte: {{telefono_soporte}}
```

### 7. Welcome SMS
```
¡Bienvenido a Get Perk'd! 🎓 Descubre descuentos exclusivos para estudiantes. Comenzar: {{url_corta}}
```

### 8. Business Approval SMS
```
🏪 ¡Tu negocio {{nombre}} fue aprobado en Get Perk'd! Crear tu primera oferta: {{url_dashboard}}
```

### 9. Staff Invitation SMS
```
Has sido invitado al equipo de {{negocio}} en Get Perk'd. Código PIN: {{pin}}. Ingresar: {{url_staff}}
```

### 10. Trending Deal SMS
```
🔥 Oferta trending: {{titulo}} en {{negocio}}. {{descuento}}% OFF - ¡{{cantidad}} estudiantes ya la guardaron! {{url_corta}}
```

## Implementation Guidelines

### Email Template Usage
1. **Personalization**: All templates use {{variable}} syntax for dynamic content
2. **Responsive Design**: Templates work on mobile and desktop
3. **Brand Consistency**: Get Perk'd colors and styling throughout
4. **Clear CTAs**: Prominent action buttons in each template
5. **Unsubscribe**: All marketing emails include unsubscribe links

### SMS Template Usage
1. **Character Limits**: All SMS under 160 characters for single message
2. **URL Shortening**: Use short URLs to save characters
3. **Emojis**: Strategic use of emojis for visual appeal
4. **Clear Action**: Each SMS has a clear next step
5. **Opt-out**: Include opt-out instructions in welcome messages

### Localization Best Practices
1. **Cultural Adaptation**: Use appropriate greetings and formality levels
2. **Regional Terms**: Adapt payment and discount terminology
3. **Date Formats**: Use DD/MM/YYYY format for LATAM markets
4. **Currency**: Support local currency symbols and formatting
5. **Time Zones**: Adjust timing for local time zones

### Testing Requirements
1. **Template Rendering**: Test all variables populate correctly
2. **Mobile Compatibility**: Verify emails display properly on mobile
3. **SMS Delivery**: Test SMS delivery across different carriers
4. **Character Encoding**: Ensure Spanish characters display correctly
5. **Link Functionality**: Verify all URLs work properly

## Integration with Existing System

### Email Service Integration
```javascript
// Example integration with existing email service
const emailService = {
  templates: {
    'welcome-student-es': 'spanish-welcome-student-template',
    'welcome-business-es': 'spanish-welcome-business-template',
    'new-deal-es': 'spanish-new-deal-template',
    // ... other templates
  },
  
  sendEmail(templateId, recipientData, variables) {
    const template = this.templates[templateId];
    return this.sendTemplatedEmail(template, recipientData, variables);
  }
};
```

### SMS Service Integration
```javascript
// Example integration with Twilio SMS
const smsService = {
  templates: {
    'new-deal-es': '🎉 Nueva oferta Get Perk\'d: {{titulo}} en {{negocio}}. {{descuento}}% OFF hasta {{fecha}}. Ver: {{url_corta}}',
    'expiring-deal-es': '⏰ ¡Oferta expira hoy! {{titulo}} en {{negocio}}. {{descuento}}% OFF. Canjear: {{url_corta}}',
    // ... other templates
  },
  
  sendSMS(templateId, phoneNumber, variables) {
    const template = this.templates[templateId];
    const message = this.populateTemplate(template, variables);
    return this.sendMessage(phoneNumber, message);
  }
};
```

---

**Status**: Ready for implementation
**Language**: Spanish (Mexico/LATAM)
**Template Count**: 6 email templates + 10 SMS templates
**Last Updated**: July 17, 2025
**Next Review**: Before August 1st launch