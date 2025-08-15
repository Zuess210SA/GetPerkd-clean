
# 📬 Phase 2.5: Daily Digest Scoring + Templates + Settings

## 🔢 Digest Scoring Logic

Each deal should be scored (0–100) per user. Pick top 3–5 deals daily based on:

| Factor                  | Weight | Description                                  |
|-------------------------|--------|----------------------------------------------|
| **Category Match**      | +20    | If user follows the deal’s category          |
| **Distance (if available)** | +15 | Closer deals = higher score                  |
| **Trending Status**     | +20    | Marked trending = strong boost               |
| **Discount %**          | +15    | 30%+ = stronger score                        |
| **User Follows Merchant** | +25  | Personal connection = key                    |
| **Recent Deal**         | +5     | Within last 24h = freshness bump             |

**Fallback logic:**  
If 0 deals score high enough, show a no-deals message:  
`"No new perks today — more coming soon! 🔄"`

---

## 📝 Mock Digest Templates

### Push Notification (compact):
`🎉 Your Daily Perks: 50% Tacos, BOGO Gym, $5 Haircuts near campus!`

### In-App Dashboard Message:
```
### 🗞️ Your Daily Perks
Here are the top deals for you today:
- 🌮 Dilla’s Tacos – 50% Off Burrito Bowls  
- 🏋️ Campus Gym – Buy 1, Bring a Friend Free  
- 💇 Fresh Cuts – $5 Fades Before 5PM  
✅ Redeem now or save for later!
```

---

## 🧠 Gamification Layer (Optional Future Enhancements)

- “🎁 Streak Saver: Opened 3 digests in a row? Unlock mystery perk.”
- “👀 You’ve been quiet… tap today’s perks to heat things up 🔥”

---

## ⚙️ Future Digest Preferences (Optional UX Layer)

Add to user preferences table:

| Setting            | Type       | Options                                  |
|--------------------|------------|------------------------------------------|
| Digest Frequency   | radio      | Daily (default), Weekly, Off             |
| Preferred Time     | dropdown   | 8AM, 12PM, 5PM                            |
| Snooze Digest      | toggle + # | “Pause for 7 days”                       |
| Digest Focus       | checkbox   | Trending Only, Followed Only, High Discounts |
