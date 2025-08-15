# ✅ Micro-Interactions QA Checklist for Get Perk’d

## 🎯 Core Functionality
- [ ] Rewards tab is visible on Student Dashboard
- [ ] All micro-interactions are tracked (login, view deal, save deal, redeem, follow business)
- [ ] XP points or perk progress properly increases after each action
- [ ] All actions have visual confirmation (e.g. checkmark, glow, confetti)

## 📊 Analytics & Tracking
- [ ] Micro-interactions log visible on `/micro-interactions-test`
- [ ] Points tracker updates in real-time
- [ ] Streaks or milestones (e.g., “5 days in a row” or “10 deals saved”) trigger correctly

## 🎁 Reward Progress
- [ ] Progress bar or level tracker reflects XP accurately
- [ ] Rewards unlock visually when thresholds are hit
- [ ] Redeemed rewards are removed from available list

## 🎨 UI Polish
- [ ] Reward animations (Flame, confetti, etc.) trigger at key milestones
- [ ] Mobile responsiveness confirmed
- [ ] Student dashboard reward tab looks professional and on-brand

## 🔐 Auth & Routing
- [ ] Only logged-in students can view rewards
- [ ] If logged out or session expires, redirects to login page