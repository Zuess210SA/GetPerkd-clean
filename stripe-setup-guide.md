# Stripe Integration Setup Guide - Get Perk'd

## Overview
This guide will help you set up Stripe payment processing for the Get Perk'd platform business subscription plans (DIY, DFY, Franchisee).

## Pre-Launch Requirements

### 1. Stripe Account Setup
1. Create a Stripe account at https://dashboard.stripe.com/
2. Complete account verification for your business
3. Set up your business profile and banking information

### 2. API Keys Configuration
1. Navigate to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)

Add these to your `.env` file:
```
STRIPE_SECRET_KEY=sk_test_your-actual-secret-key
VITE_STRIPE_PUBLIC_KEY=pk_test_your-actual-publishable-key
```

### 3. Product and Price Setup
1. Go to https://dashboard.stripe.com/products
2. Create products for each subscription plan:

#### DIY Plan
- Product Name: "Get Perk'd DIY Plan"
- Description: "Do-it-yourself merchant tools and analytics"
- Price: $29/month (or your chosen price)
- Billing: Recurring monthly

#### DFY Plan  
- Product Name: "Get Perk'd DFY Plan"
- Description: "Done-for-you merchant management and support"
- Price: $149/month (or your chosen price)
- Billing: Recurring monthly

#### Franchisee Plan
- Product Name: "Get Perk'd Franchisee Plan"
- Description: "Full franchisee access with territory management"
- Price: $299/month (or your chosen price)
- Billing: Recurring monthly

### 4. Update Price IDs
After creating the products, update the price IDs in `client/src/components/StripeCheckout.tsx`:

```typescript
const planPrices = {
  DIY: 'price_1234567890abcdef', // Replace with actual Price ID
  DFY: 'price_0987654321fedcba', // Replace with actual Price ID
  FRANCHISEE: 'price_abcdef1234567890' // Replace with actual Price ID
};
```

### 5. Webhook Configuration (Optional but Recommended)
1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://your-domain.replit.app/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`

## Testing Before Launch

### 1. Test Mode Verification
- Ensure you're using test keys (they start with `sk_test_` and `pk_test_`)
- Test with Stripe's test card numbers:
  - Success: `4242 4242 4242 4242`
  - Declined: `4000 0000 0000 0002`

### 2. Test Each Plan
1. Navigate to `/pricing` in your app
2. Select each plan (DIY, DFY, Franchisee)
3. Complete test checkout with test card
4. Verify subscription creation in Stripe dashboard

### 3. Error Handling Test
- Test with invalid card numbers
- Test with expired cards
- Verify user-friendly error messages display

## Production Deployment

### 1. Switch to Live Mode
1. In Stripe dashboard, toggle to "Live mode"
2. Generate new live API keys
3. Update `.env` with live keys:
```
STRIPE_SECRET_KEY=sk_live_your-actual-live-secret-key
VITE_STRIPE_PUBLIC_KEY=pk_live_your-actual-live-publishable-key
```

### 2. Update Price IDs
- Create live versions of your products
- Update price IDs in the code with live price IDs

### 3. Final Testing
- Test one transaction in live mode with a real card
- Verify funds appear in your Stripe account
- Test webhook delivery (if configured)

## Security Considerations

### 1. Environment Variables
- Never commit API keys to version control
- Use different keys for development, staging, and production
- Rotate keys regularly

### 2. Webhook Security
- Verify webhook signatures
- Use HTTPS endpoints only
- Implement proper error handling

### 3. Customer Data
- Follow PCI compliance guidelines
- Never store card details directly
- Use Stripe's secure card handling

## Support and Troubleshooting

### Common Issues
1. **"Stripe not configured" error**: Check that both environment variables are set
2. **"No such price" error**: Verify price IDs match your Stripe dashboard
3. **Payment fails**: Check Stripe dashboard logs for detailed error messages

### Stripe Dashboard Locations
- API Keys: https://dashboard.stripe.com/apikeys
- Products: https://dashboard.stripe.com/products
- Webhooks: https://dashboard.stripe.com/webhooks
- Logs: https://dashboard.stripe.com/logs

## Launch Checklist
- [ ] Stripe account verified and approved
- [ ] Live API keys configured
- [ ] All three subscription products created
- [ ] Price IDs updated in code
- [ ] Test transactions completed successfully
- [ ] Webhook endpoints configured (if using)
- [ ] Error handling tested
- [ ] Customer support process defined

## Current Status
⚠️ **ACTION REQUIRED**: Stripe integration is properly coded but requires configuration before August 1st launch.

The system will gracefully handle missing Stripe configuration by showing appropriate error messages to users, but payment processing will not work until properly configured.