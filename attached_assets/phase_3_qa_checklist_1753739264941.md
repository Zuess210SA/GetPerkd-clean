
# ✅ Get Perk’d – Phase 3 & 4 QA Checklist

This checklist covers testing for all redemption logic, reward flows, analytics, and student UI components.

---

## 🔐 Redemption Logic

### QR Redemption
- [ ] Scan QR routes to `/stamp/{card_id}`
- [ ] Authenticated student required
- [ ] Enforces 6-hour cooldown
- [ ] Adds new stamp to `stamps` table
- [ ] Logs method = "qr"

### PIN Redemption
- [ ] Form accepts valid 4-digit PIN
- [ ] PIN matches `staff_pins` table
- [ ] Logs method = "pin"
- [ ] Invalid PIN blocked

---

## 🎁 Reward Unlock & Redemption

### Unlock Logic
- [ ] Reward unlocks when stamp count matches reward position
- [ ] Updates `user_rewards.status = 'unlocked'`
- [ ] Sets `unlocked_at` timestamp
- [ ] Returns `{ reward_unlocked: true }` to trigger animation

### Redeem Logic
- [ ] “Claim Reward” button visible if reward unlocked
- [ ] After click → sets `status = redeemed` + `redeemed_at`
- [ ] Handles expired rewards gracefully
- [ ] Returns `{ reward_id, reward_position }`

---

## 📊 Analytics

### Merchant Dashboard
- [ ] Stamps earned (filtered by date + business)
- [ ] Rewards unlocked/redeemed
- [ ] Role-safe: sees only own data
- [ ] CSV export works

### Franchisee Dashboard
- [ ] Sees all business data in assigned territory
- [ ] Can export CSV with all stamp data
- [ ] Filter by date

### Admin Dashboard
- [ ] Global view of all campuses/businesses
- [ ] Line/Bar charts render correctly
- [ ] All metrics accurate

---

## 🎒 Student Loyalty View

- [ ] Displays Top 3 active stamp cards
- [ ] My Stats (Stamps, Unlocked, Redeemed)
- [ ] “Show More” button loads full list (future)
- [ ] Responsive on mobile

---

## 🧪 Testing Conditions

- [ ] Try redemption with cooldown active
- [ ] Try redemption with invalid PIN
- [ ] Try reward unlock with no reward configured
- [ ] Try redeeming expired reward
- [ ] Validate CSV file content structure

---

**QA Owner:** ________________  
**Test Date:** ________________  
