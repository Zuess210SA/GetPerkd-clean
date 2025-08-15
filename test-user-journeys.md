# Get Perk'd User Journey Test Cases

Based on ChatGPT's "Smart Push" anti-spam strategy, here are realistic user flows for testing the follow business feature and smart notification system.

## 🔄 User Flow 1: Follow → Digest → Trending Deal → Unfollow
**User:** Jasmine, UTSA Freshman  
**Scenario:** Jasmine discovers Get Perk'd during welcome week. She follows a few favorite spots and sees the system respond smartly.

### Step-by-Step:
1. **Visits Deal Feed**
   - Sees deals from Dallah Med, Pizza Rio, Toro Bowl
   - Clicks ❤️ on Dallah Med + Pizza Rio + Toro Bowl → Now following 3 merchants

2. **Sets Notification Preferences**
   - Turns on "Only notify me from followed businesses"
   - Sets Daily Limit: 3 and Min Discount: 15%

3. **Next Morning (Digest Triggered)**
   - Receives 1 push: "🔥 Your Daily Perks: $5 Shawarma, 20% Off Tacos, Free Boba Drop!"

4. **Later That Day**
   - Sees an instant push: "🚨 Trending: Toro Bowl's 50% Off Deal is blowing up!"
   - Opens, saves deal, redeems that day

5. **After Two Weeks**
   - Notices Toro Bowl is posting too often
   - Goes to Profile → Unfollows Toro Bowl

**✅ Result:** Pushes stay relevant, digest is on point, and Jasmine feels in control.

## 🧭 User Flow 2: New User, Zero Follows → Gradual Engagement
**User:** Carlos, Commuter Sophomore  
**Scenario:** Carlos is cautious about spam and doesn't follow anyone at first.

### Steps:
1. **Skips Following at Signup**
   - Browses deals but ignores the follow buttons

2. **Receives Digest Next Morning (Broad-Based)**
   - Gets: "🎉 New Deals: $3 Coffee, 2-for-1 Haircut, Free Gym Week"
   - 2 of them catch his attention

3. **Opens Deal → Sees Push Toggle for Merchant**
   - Follows Campus Coffee Co.
   - Enables notifications

4. **Now Receives Targeted Pushes for Just That Business**
   - No more spam, only when Campus Coffee drops 🔥

**✅ Result:** Carlos stays engaged without getting annoyed, slowly builds loyalty to local spots.

## 🔁 User Flow 3: Power User on Strict Filters
**User:** Taylor, Honors Student & Busy Bee  
**Scenario:** Taylor is obsessed with value — only wants big discounts and no spam.

### Steps:
1. **Follows 5 Businesses**
   - Only the most relevant ones for her (study cafés, tutoring deals)

2. **Notification Preferences**
   - Only Followed: ✅
   - Daily Max: 2
   - Min Discount: 25%
   - Quality Filter: "Only Trending"

3. **Next Morning:**
   - Gets 1 digest: "🎯 30% Off Tutor Time & Free Espresso Shot Today"

4. **Never Receives Irrelevant Pushes**

**✅ Result:** Taylor becomes a Get Perk'd superfan because it respects her time and delivers value only.

## 📊 Test Metrics to Track

### Engagement Metrics:
- Follow rate from deal cards
- Notification open rates
- Deal redemption rates from followed businesses
- Unfollow rate over time

### Anti-Spam Effectiveness:
- Daily notification volume per user
- User satisfaction with notification relevance
- Complaint/unsubscribe rates

### Business Value:
- Increased loyalty to followed businesses
- Higher redemption rates for followed vs. unfollowed
- Business owner satisfaction with follower engagement

## 🔧 Implementation Status

### ✅ Completed:
- Follow business button on deal cards
- Follow/unfollow API endpoints
- Notification preferences for "only followed businesses"
- Follow status checking and follower counts

### 🚧 In Progress:
- Daily digest notifications
- Trending deal detection
- Smart notification filtering based on follow status

### 📋 Next Steps:
1. Implement daily digest system
2. Add trending deal algorithm
3. Create notification scheduler
4. Build analytics dashboard
5. Test all user flows with real UTSA students

## 🎯 Key Success Indicators

**Phase 1 (Current):** Users can follow businesses and control notifications
**Phase 2 (Next):** Daily digest reduces notification spam while maintaining engagement
**Phase 3 (Future):** Trending intelligence ensures users never miss hot deals

The system respects user attention while maximizing business value — exactly what UTSA students need in a busy college environment.