// @ts-nocheck
import { pgTable, text, serial, integer, boolean, timestamp, varchar, decimal, uuid, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  full_name: text("full_name").notNull(),
  university: text("university").notNull(),
  student_id: text("student_id"), // For students - optional for faculty/staff
  is_business_owner: boolean("is_business_owner").default(false),
  wants_push_notifications: boolean("wants_push_notifications").default(false),
  onesignal_id: text("onesignal_id"),
  phone_number: text("phone_number"),
  wants_email: boolean("wants_email").default(true),
  wants_sms: boolean("wants_sms").default(false),
  location_id: text("location_id").default("san-antonio"),
  // Notification filtering preferences
  notification_categories: text("notification_categories").array().default(['Food', 'Entertainment', 'Shopping']),
  max_notifications_per_day: integer("max_notifications_per_day").default(5),
  only_trending_deals: boolean("only_trending_deals").default(false),
  only_high_value_deals: boolean("only_high_value_deals").default(false),
  min_discount_percent: integer("min_discount_percent").default(10),
  // Follow-based notification preferences
  only_followed_businesses: boolean("only_followed_businesses").default(false),
  wants_digest_notifications: boolean("wants_digest_notifications").default(true),
  digest_frequency: text("digest_frequency").default("daily"), // daily, weekly, never
  
  // ChatGPT's enhanced digest preferences
  digestPreferredTime: text("digest_preferred_time").default("8AM"), // 8AM, 12PM, 5PM
  digestSnoozeDays: integer("digest_snooze_days").default(0), // 0 = not snoozed, 1-30 = days to snooze
  digestFocus: text("digest_focus").array().default(['all']), // trending, followed, high-discounts, all
  // Student engagement features
  totalXp: integer("total_xp").default(0),
  currentLevel: integer("current_level").default(1),
  achievementBadges: text("achievement_badges").array().default([]),
  referralCode: text("referral_code").unique(),
  referredBy: integer("referred_by").references(() => users.id),
  totalReferrals: integer("total_referrals").default(0),
  // Social features
  profileIsPublic: boolean("profile_is_public").default(true),
  allowFriendRequests: boolean("allow_friend_requests").default(true),
  firstName: text("first_name"),
  lastName: text("last_name"),
  bio: text("bio"),
  favoriteCategories: text("favorite_categories").array().default([]),
  // Engagement metrics
  dealsShared: integer("deals_shared").default(0),
  weeklyStreak: integer("weekly_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastActiveDate: timestamp("last_active_date").defaultNow(),
  // Micro-interaction engagement tracking
  dailyInteractionCount: integer("daily_interaction_count").default(0),
  weeklyInteractionCount: integer("weekly_interaction_count").default(0),
  totalInteractionCount: integer("total_interaction_count").default(0),
  lastInteractionDate: timestamp("last_interaction_date").defaultNow(),
  consecutiveInteractionDays: integer("consecutive_interaction_days").default(0),
  microRewardXp: integer("micro_reward_xp").default(0),
  interactionStreak: integer("interaction_streak").default(0),
  lastRewardDate: timestamp("last_reward_date").defaultNow(),
  // Test mode flag for safe testing
  isTest: boolean("is_test").default(false),
  // Simple campus community member tracking for institutional trust
  campusMemberType: text("campus_member_type").default("student"), // student, professor, staff, administrator, business_owner
  // Behavioral engagement tracking for community verification
  emailDomain: text("email_domain"), // stores the domain part of email for analytics only
  campusEngagementScore: integer("campus_engagement_score").default(0), // based on campus-area redemptions
  behaviorVerificationLevel: text("behavior_verification_level").default("new"), // new, campus_active, community_verified
  nearCampusRedemptions: integer("near_campus_redemptions").default(0), // redemptions within campus radius
  communityEngagementPoints: integer("community_engagement_points").default(0), // challenges, ambassador activities
  // Super Admin fields
  role: text("role").default("user"), // user, admin, super_admin
  status: text("status").default("active"), // active, suspended, banned
  credits: integer("credits").default(0),
  subscriptionStatus: text("subscription_status").default("none"), // none, active, expired, cancelled
  subscriptionExpires: timestamp("subscription_expires"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Franchisee Territory Management System
export const franchiseTerritories = pgTable("franchise_territories", {
  id: serial("id").primaryKey(),
  franchiseeId: integer("franchisee_id").references(() => users.id), // NULL for corporate territories
  name: text("name").notNull(), // "UTSA Territory", "North San Antonio"
  description: text("description"),
  
  // Ownership type
  ownershipType: text("ownership_type").notNull().default("franchise"), // "corporate" or "franchise"
  corporateRegion: text("corporate_region"), // "Texas", "Southwest", etc for corporate territories
  
  // Geographic boundaries
  boundaryType: text("boundary_type").notNull().default("polygon"), // polygon, radius, zip_codes, campus
  boundaryData: text("boundary_data").notNull(), // JSON: coordinates, center+radius, zip codes, campus IDs
  
  // Campus assignments
  assignedCampuses: text("assigned_campuses").array().default([]), // ["utsa", "alamo-central"]
  excludedZipCodes: text("excluded_zip_codes").array().default([]),
  
  // Territory rules
  isActive: boolean("is_active").default(true),
  allowsSubFranchises: boolean("allows_sub_franchises").default(false),
  exclusivityLevel: text("exclusivity_level").default("strict"), // strict, shared, flexible
  
  // Revenue sharing settings
  revenueSharePercent: decimal("revenue_share_percent", { precision: 5, scale: 2 }).default("15.00"), // 15%
  minimumMonthlyFee: decimal("minimum_monthly_fee", { precision: 8, scale: 2 }).default("299.00"),
  setupFee: decimal("setup_fee", { precision: 8, scale: 2 }).default("1999.00"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const businessTerritoryAssignments = pgTable("business_territory_assignments", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  territoryId: integer("territory_id").notNull().references(() => franchiseTerritories.id),
  franchiseeId: integer("franchisee_id").references(() => users.id), // NULL for corporate territories
  
  // Assignment ownership
  ownershipType: text("ownership_type").notNull().default("franchise"), // "corporate" or "franchise"
  
  // Assignment details
  assignedAt: timestamp("assigned_at").defaultNow(),
  assignedBy: integer("assigned_by").references(() => users.id), // admin who made assignment
  assignmentMethod: text("assignment_method").default("automatic"), // automatic, manual, disputed
  
  // Revenue tracking
  monthlyRevenue: decimal("monthly_revenue", { precision: 10, scale: 2 }).default("0.00"),
  totalRevenue: decimal("total_revenue", { precision: 12, scale: 2 }).default("0.00"),
  lastRevenueUpdate: timestamp("last_revenue_update").defaultNow(),
  
  // Status
  isActive: boolean("is_active").default(true),
  notes: text("notes"),
  
  // Ensure unique business-territory pairs
}, (table) => ({
  uniqueBusinessTerritory: unique().on(table.businessId, table.territoryId)
}));

export const revenueTransactions = pgTable("revenue_transactions", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull().unique(), // External payment ID
  
  // Assignment details
  businessId: integer("business_id").notNull().references(() => businesses.id),
  territoryId: integer("territory_id").notNull().references(() => franchiseTerritories.id),
  franchiseeId: integer("franchisee_id").notNull().references(() => users.id),
  
  // Financial details
  grossAmount: decimal("gross_amount", { precision: 10, scale: 2 }).notNull(),
  franchiseeShare: decimal("franchisee_share", { precision: 10, scale: 2 }).notNull(),
  companyShare: decimal("company_share", { precision: 10, scale: 2 }).notNull(),
  sharePercentage: decimal("share_percentage", { precision: 5, scale: 2 }).notNull(),
  
  // Transaction metadata
  transactionType: text("transaction_type").notNull(), // subscription, deal_commission, setup_fee
  description: text("description"),
  externalPaymentId: text("external_payment_id"), // Stripe payment intent ID
  
  // Status tracking
  status: text("status").default("pending"), // pending, processed, disputed, refunded
  processedAt: timestamp("processed_at"),
  
  createdAt: timestamp("created_at").defaultNow()
});

export const territoryDisputes = pgTable("territory_disputes", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  
  // Dispute parties
  currentFranchiseeId: integer("current_franchisee_id").references(() => users.id),
  claimingFranchiseeId: integer("claiming_franchisee_id").notNull().references(() => users.id),
  
  // Dispute details
  disputeReason: text("dispute_reason").notNull(), // boundary_overlap, business_moved, assignment_error
  description: text("description").notNull(),
  evidence: text("evidence"), // JSON: photos, documents, coordinates
  
  // Resolution
  status: text("status").default("open"), // open, investigating, resolved, rejected
  resolvedBy: integer("resolved_by").references(() => users.id),
  resolution: text("resolution"),
  resolvedAt: timestamp("resolved_at"),
  
  createdAt: timestamp("created_at").defaultNow()
});

export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address").notNull(),
  phone: text("phone"),
  email: text("email"),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  verified: boolean("verified").default(false),
  // Test mode flag for safe testing
  isTest: boolean("is_test").default(false),
  // Business billing and subscription fields
  subscriptionPlan: text("subscription_plan").default("none"), // none, diy, dfy, franchisee
  subscriptionStatus: text("subscription_status").default("trial"), // trial, active, expired, cancelled
  billingCycleEnd: timestamp("billing_cycle_end"),
  creditsRemaining: integer("credits_remaining").default(0),
  // Campus access tiers - your strategic monetization model
  campusAccessTier: text("campus_access_tier").default("starter"), // "starter" (3 campuses), "growth" (6 campuses), "premium" (9 campuses), "statewide" (all campuses)
  allowedCampusCount: integer("allowed_campus_count").default(3),
  selectedCampuses: text("selected_campuses").array().default([]), // Array of campus subdomains they have access to
  // Pricing for tiers: starter $49/mo, growth $99/mo, premium $149/mo, statewide $199/mo
  monthlyPrice: decimal("monthly_price", { precision: 8, scale: 2 }).default("49.00"),
  
  // 🎯 AUTOMATIC CITY CARD ASSIGNMENT - ChatGPT Final Strategy
  autoAssignedCityCard: text("auto_assigned_city_card"), // "san-antonio", "austin", "san-marcos" - auto-assigned based on business location
  cityCardAssignedAt: timestamp("city_card_assigned_at"), // when city card was auto-assigned
  cityCardAssignmentMethod: text("city_card_assignment_method").default("automatic"), // "automatic", "manual", "override"
  status: text("status").default("active"), // active, suspended, terminated
  createdAt: timestamp("created_at").defaultNow(),
});

export const deals = pgTable("deals", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").references(() => businesses.id),
  // Multilingual content - generated at creation time
  titleEn: text("title_en").notNull(),
  titleEs: text("title_es"),
  titleFr: text("title_fr"), // Future-ready for French
  titleZh: text("title_zh"), // Future-ready for Chinese
  titleAr: text("title_ar"), // Future-ready for Arabic
  descriptionEn: text("description_en").notNull(),
  descriptionEs: text("description_es"),
  descriptionFr: text("description_fr"), // Future-ready for French
  descriptionZh: text("description_zh"), // Future-ready for Chinese
  descriptionAr: text("description_ar"), // Future-ready for Arabic
  termsEn: text("terms_en"),
  termsEs: text("terms_es"),
  
  // Legacy fields for backward compatibility
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  discountPercent: integer("discount_percent"),
  discountAmount: decimal("discount_amount"),
  originalPrice: decimal("original_price"),
  discountedPrice: decimal("discounted_price"),
  imageUrl: text("image_url"),
  termsAndConditions: text("terms_and_conditions"),
  validFrom: timestamp("valid_from").defaultNow(),
  validUntil: timestamp("valid_until").notNull(),
  maxRedemptions: integer("max_redemptions"),
  currentRedemptions: integer("current_redemptions").default(0),
  isActive: boolean("is_active").default(true),
  requiresStaffVerification: boolean("requires_staff_verification").default(false),
  // Trending intelligence fields
  saveCount: integer("save_count").default(0),
  redemptionCount: integer("redemption_count").default(0),
  viewCount: integer("view_count").default(0),
  isTrending: boolean("is_trending").default(false),
  // Admin control fields
  adminApprovedPush: boolean("admin_approved_push").default(false),
  // Test mode flag for safe testing
  isTest: boolean("is_test").default(false),
  
  // 🎯 BUSINESS TARGETING SYSTEM - Answer to user's strategic question
  targetingType: text("targeting_type").notNull().default("campus_specific"), // campus_specific, all_san_antonio, geographic_radius
  targetedCampuses: text("targeted_campuses").array().default([]), // ["utsa", "txst"] or empty for all
  geographicRadius: integer("geographic_radius"), // radius in miles for geographic targeting
  businessLatitude: decimal("business_latitude", { precision: 10, scale: 8 }), // for radius calculation
  businessLongitude: decimal("business_longitude", { precision: 11, scale: 8 }), // for radius calculation
  includePriateCampuses: boolean("include_private_campuses").default(true), // include STMU, TU, UIW
  includeCommunityColleges: boolean("include_community_colleges").default(true), // include Alamo colleges
  customTargetingRules: text("custom_targeting_rules"), // JSON for advanced rules
  
  // 🌐 HYBRID TRANSLATION FRAMEWORK - AI + Regional Slang (metadata)
  translationCampusPack: text("translation_campus_pack"), // which regional pack was used (utsa, alamo, texasstate, etc.)
  translationConfidence: decimal("translation_confidence", { precision: 3, scale: 2 }), // AI confidence score 0.00-1.00
  isManualOverride: boolean("is_manual_override").default(false), // true if human manually corrected
  translationFallbackUsed: boolean("translation_fallback_used").default(false), // true if AI failed and fallback used
  translatedAt: timestamp("translated_at"), // when translation was generated
  translatedBy: text("translated_by").default("ai"), // 'ai' or user ID if manual
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const savedDeals = pgTable("saved_deals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  dealId: integer("deal_id").references(() => deals.id),
  savedAt: timestamp("saved_at").defaultNow(),
}, (table) => ({
  userDealUnique: unique().on(table.userId, table.dealId),
}));

export const followedBusinesses = pgTable("followed_businesses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  businessId: integer("business_id").references(() => businesses.id),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  userBusinessUnique: unique().on(table.userId, table.businessId),
}));

export const redemptions = pgTable("redemptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  dealId: integer("deal_id").references(() => deals.id),
  method: text("method").notNull(), // 'self', 'staff', 'saved'
  staffCode: text("staff_code"),
  verifiedBy: integer("verified_by").references(() => users.id),
  redemptionCode: text("redemption_code"),
  redeemedAt: timestamp("redeemed_at").defaultNow(),
  isVerified: boolean("is_verified").default(false),
});

export const staffProfiles = pgTable("staff_profiles", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  pin: text("pin").notNull(),
  businessId: integer("business_id").references(() => businesses.id),
  role: text("role").notNull().default("staff"),
  fullName: text("full_name"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // engagement, social, redemption, streak
  xpReward: integer("xp_reward").default(0),
  requirement: text("requirement").notNull(), // JSON string with requirements
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  achievementId: integer("achievement_id").references(() => achievements.id),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
  progress: integer("progress").default(0),
  isCompleted: boolean("is_completed").default(false),
}, (table) => ({
  userAchievementUnique: unique().on(table.userId, table.achievementId),
}));

export const friendships = pgTable("friendships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  friendId: integer("friend_id").references(() => users.id),
  status: text("status").notNull().default("pending"), // pending, accepted, blocked
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  userFriendUnique: unique().on(table.userId, table.friendId),
}));

export const dealShares = pgTable("deal_shares", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  dealId: integer("deal_id").references(() => deals.id),
  sharedWith: text("shared_with"), // email or phone
  shareMethod: text("share_method").notNull(), // email, sms, social
  sharedAt: timestamp("shared_at").defaultNow(),
});

export const referralRewards = pgTable("referral_rewards", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrer_id").references(() => users.id),
  referredId: integer("referred_id").references(() => users.id),
  rewardType: text("reward_type").notNull(), // xp, badge, discount
  rewardValue: text("reward_value").notNull(),
  isClaimedByReferrer: boolean("is_claimed_by_referrer").default(false),
  isClaimedByReferred: boolean("is_claimed_by_referred").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notificationSubscriptions = pgTable("notification_subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  endpoint: text("endpoint").notNull(),
  p256dhKey: text("p256dh_key").notNull(),
  authKey: text("auth_key").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const microInteractions = pgTable("micro_interactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  interactionType: text("interaction_type").notNull(), // 'view_deal', 'save_deal', 'follow_business', 'share_deal', 'search', 'filter', 'login', 'profile_update', 'notification_click'
  targetId: integer("target_id"), // ID of the deal, business, or other entity
  targetType: text("target_type"), // 'deal', 'business', 'search', 'profile', 'notification'
  sessionId: text("session_id"),
  timeSpent: integer("time_spent"), // seconds
  deviceType: text("device_type").default("web"), // 'web', 'mobile', 'tablet'
  metadata: text("metadata"), // JSON string for additional context
  createdAt: timestamp("created_at").defaultNow(),
});

export const microRewards = pgTable("micro_rewards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  interactionId: integer("interaction_id").references(() => microInteractions.id),
  rewardType: text("reward_type").notNull(), // 'xp', 'badge', 'streak_bonus', 'milestone_reward'
  rewardValue: integer("reward_value").notNull(), // XP amount or level
  rewardTitle: text("reward_title").notNull(),
  rewardDescription: text("reward_description"),
  rewardCategory: text("reward_category").notNull(), // 'daily_activity', 'interaction_streak', 'exploration', 'engagement', 'milestone'
  isVisible: boolean("is_visible").default(true), // Some rewards are background XP
  isCollected: boolean("is_collected").default(false),
  collectedAt: timestamp("collected_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const streakMilestones = pgTable("streak_milestones", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  streakType: text("streak_type").notNull(), // 'daily_login', 'interaction_streak', 'weekly_activity'
  streakCount: integer("streak_count").notNull(),
  milestoneLevel: integer("milestone_level").notNull(), // 3, 7, 14, 30, 60, 100 days
  rewardXp: integer("reward_xp").notNull(),
  specialBadge: text("special_badge"),
  achievedAt: timestamp("achieved_at").defaultNow(),
});


// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertBusinessSchema = createInsertSchema(businesses).omit({
  id: true,
  createdAt: true,
});

export const insertDealSchema = createInsertSchema(deals).omit({
  id: true,
  createdAt: true,
  currentRedemptions: true,
});

export const insertSavedDealSchema = createInsertSchema(savedDeals).omit({
  id: true,
  savedAt: true,
});

export const insertFollowedBusinessSchema = createInsertSchema(followedBusinesses).omit({
  id: true,
  createdAt: true,
});

export const insertRedemptionSchema = createInsertSchema(redemptions).omit({
  id: true,
  redeemedAt: true,
});

export const insertStaffProfileSchema = createInsertSchema(staffProfiles).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSubscriptionSchema = createInsertSchema(notificationSubscriptions).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  unlockedAt: true,
});

export const insertFriendshipSchema = createInsertSchema(friendships).omit({
  id: true,
  createdAt: true,
});

export const insertDealShareSchema = createInsertSchema(dealShares).omit({
  id: true,
  sharedAt: true,
});

export const insertReferralRewardSchema = createInsertSchema(referralRewards).omit({
  id: true,
  createdAt: true,
});

export const insertMicroInteractionSchema = createInsertSchema(microInteractions).omit({
  id: true,
  createdAt: true,
});

export const insertMicroRewardSchema = createInsertSchema(microRewards).omit({
  id: true,
  createdAt: true,
  collectedAt: true,
});

export const insertStreakMilestoneSchema = createInsertSchema(streakMilestones).omit({
  id: true,
  achievedAt: true,
});


// Types
export type User = typeof users.$inferSelect;
export type Business = typeof businesses.$inferSelect;
export type Deal = typeof deals.$inferSelect;
export type SavedDeal = typeof savedDeals.$inferSelect;
export type FollowedBusiness = typeof followedBusinesses.$inferSelect;
export type Redemption = typeof redemptions.$inferSelect;
export type StaffProfile = typeof staffProfiles.$inferSelect;
export type NotificationSubscription = typeof notificationSubscriptions.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type Friendship = typeof friendships.$inferSelect;
export type DealShare = typeof dealShares.$inferSelect;
export type ReferralReward = typeof referralRewards.$inferSelect;
export type MicroInteraction = typeof microInteractions.$inferSelect;
export type MicroReward = typeof microRewards.$inferSelect;
export type StreakMilestone = typeof streakMilestones.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type InsertDeal = z.infer<typeof insertDealSchema>;
export type InsertSavedDeal = z.infer<typeof insertSavedDealSchema>;
export type InsertFollowedBusiness = z.infer<typeof insertFollowedBusinessSchema>;
export type InsertRedemption = z.infer<typeof insertRedemptionSchema>;
export type InsertStaffProfile = z.infer<typeof insertStaffProfileSchema>;
export type InsertNotificationSubscription = z.infer<typeof insertNotificationSubscriptionSchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type InsertFriendship = z.infer<typeof insertFriendshipSchema>;
export type InsertDealShare = z.infer<typeof insertDealShareSchema>;
export type InsertReferralReward = z.infer<typeof insertReferralRewardSchema>;
export type InsertMicroInteraction = z.infer<typeof insertMicroInteractionSchema>;
export type InsertMicroReward = z.infer<typeof insertMicroRewardSchema>;
export type InsertStreakMilestone = z.infer<typeof insertStreakMilestoneSchema>;

// Extended types for API responses
export type DealWithBusiness = Deal & {
  business: Business;
  isSaved?: boolean;
  redemption?: Redemption;
};

export type BusinessWithStats = Business & {
  totalDeals: number;
  totalRedemptions: number;
  activeDeals: number;
};

// Super Admin Audit Log for tracking all super admin actions
export const superAdminAuditLog = pgTable("super_admin_audit_log", {
  id: serial("id").primaryKey(),
  adminUserId: integer("admin_user_id").references(() => users.id),
  targetType: text("target_type").notNull(), // user, business, deal, system
  targetId: integer("target_id"), // ID of the affected entity
  action: text("action").notNull(), // grant_credits, extend_subscription, change_status, etc.
  details: text("details"), // JSON string with action details
  previousValues: text("previous_values"), // JSON string with values before change
  newValues: text("new_values"), // JSON string with values after change
  reason: text("reason"), // Reason provided by admin
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSuperAdminAuditLogSchema = createInsertSchema(superAdminAuditLog).omit({
  id: true,
  createdAt: true,
});

export type InsertSuperAdminAuditLog = z.infer<typeof insertSuperAdminAuditLogSchema>;
export type SuperAdminAuditLog = typeof superAdminAuditLog.$inferSelect;

// Franchisee Territory Types
export const insertFranchiseTerritorySchema = createInsertSchema(franchiseTerritories);
export type InsertFranchiseTerritory = typeof franchiseTerritories.$inferInsert;
export type FranchiseTerritory = typeof franchiseTerritories.$inferSelect;

export const insertBusinessTerritoryAssignmentSchema = createInsertSchema(businessTerritoryAssignments);
export type InsertBusinessTerritoryAssignment = typeof businessTerritoryAssignments.$inferInsert;
export type BusinessTerritoryAssignment = typeof businessTerritoryAssignments.$inferSelect;

export const insertRevenueTransactionSchema = createInsertSchema(revenueTransactions);
export type InsertRevenueTransaction = typeof revenueTransactions.$inferInsert;
export type RevenueTransaction = typeof revenueTransactions.$inferSelect;

export const insertTerritoryDisputeSchema = createInsertSchema(territoryDisputes);
export type InsertTerritoryDispute = typeof territoryDisputes.$inferInsert;
export type TerritoryDispute = typeof territoryDisputes.$inferSelect;

// Universities/Campus Geographic Database for accurate business targeting
export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  subdomain: text("subdomain").notNull().unique(),
  city: text("city").notNull(),
  state: text("state").notNull().default("TX"),
  zipCode: text("zip_code"),
  address: text("address"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  studentCount: integer("student_count").notNull(),
  isActive: boolean("is_active").default(true),
  campusType: text("campus_type").notNull(), // public, private, community
  marketingFocus: text("marketing_focus"), // tex-mex-cultural, gen-z-energy, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUniversitySchema = createInsertSchema(universities);
export type InsertUniversity = typeof universities.$inferInsert;
export type University = typeof universities.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  referrer: one(users, {
    fields: [users.referredBy],
    references: [users.id],
  }),
  referrals: many(users),
  businesses: many(businesses),
  deals: many(deals),
  redemptions: many(redemptions),
  savedDeals: many(savedDeals),
}));
