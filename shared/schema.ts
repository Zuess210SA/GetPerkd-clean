import { pgTable, text, serial, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Clean Users table with snake_case naming - aligned with original ZIP specifications
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  full_name: text("full_name").notNull(),
  university: text("university").notNull(),
  student_id: text("student_id"),
  is_business_owner: boolean("is_business_owner").default(false),
  created_at: timestamp("created_at").defaultNow(),
});

// Businesses table - core original functionality
export const businesses = pgTable("businesses", {
  id: uuid("id").primaryKey().defaultRandom(),
  owner_id: uuid("owner_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address").notNull(),
  phone: text("phone"),
  email: text("email"),
  category: text("category").notNull(),
  image_url: text("image_url"),
  verified: boolean("verified").default(false),
  is_test: boolean("is_test").default(false),
  created_at: timestamp("created_at").defaultNow(),
});

// Loyalty Cards - from original ZIP files  
export const loyalty_cards = pgTable("loyalty_cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  business_id: uuid("business_id").notNull().references(() => businesses.id),
  name: text("name").notNull(),
  description: text("description"),
  stamp_requirement: integer("stamp_requirement").notNull().default(10),
  reward_title: text("reward_title").notNull(),
  reward_description: text("reward_description").notNull(),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

// Stamps - from original ZIP files
export const stamps = pgTable("stamps", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id).notNull(),
  card_id: uuid("card_id").references(() => loyalty_cards.id).notNull(),
  business_id: uuid("business_id").references(() => businesses.id).notNull(),
  method: text("method").notNull(), // 'qr' or 'pin'
  staff_id: uuid("staff_id"),
  created_at: timestamp("created_at").defaultNow(),
});

// User Rewards - from original ZIP files
export const user_rewards = pgTable("user_rewards", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id).notNull(),
  card_id: uuid("card_id").references(() => loyalty_cards.id).notNull(),
  reward_position: integer("reward_position").notNull(),
  status: text("status").notNull().default("locked"), // 'locked', 'unlocked', 'redeemed'
  unlocked_at: timestamp("unlocked_at"),
  redeemed_at: timestamp("redeemed_at"),
  business_id: uuid("business_id").references(() => businesses.id),
  expires_at: timestamp("expires_at"),
});

// Deals - basic deal system
export const deals = pgTable("deals", {
  id: uuid("id").primaryKey().defaultRandom(),
  business_id: uuid("business_id").references(() => businesses.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  discount_percent: integer("discount_percent"),
  discount_amount: text("discount_amount"),
  category: text("category").notNull(),
  valid_until: timestamp("valid_until"),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

// Basic relations
export const userRelations = relations(users, ({ many }) => ({
  businesses: many(businesses),
  stamps: many(stamps),
  rewards: many(user_rewards),
}));

export const businessRelations = relations(businesses, ({ one, many }) => ({
  owner: one(users, {
    fields: [businesses.owner_id],
    references: [users.id],
  }),
  loyaltyCards: many(loyalty_cards),
  deals: many(deals),
}));

export const loyaltyCardRelations = relations(loyalty_cards, ({ one, many }) => ({
  business: one(businesses, {
    fields: [loyalty_cards.business_id],
    references: [businesses.id],
  }),
  stamps: many(stamps),
  rewards: many(user_rewards),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users);
export const insertBusinessSchema = createInsertSchema(businesses);
export const insertLoyaltyCardSchema = createInsertSchema(loyalty_cards);
export const insertStampSchema = createInsertSchema(stamps);
export const insertUserRewardSchema = createInsertSchema(user_rewards);
export const insertDealSchema = createInsertSchema(deals);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Business = typeof businesses.$inferSelect;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type LoyaltyCard = typeof loyalty_cards.$inferSelect;
export type InsertLoyaltyCard = z.infer<typeof insertLoyaltyCardSchema>;
export type Stamp = typeof stamps.$inferSelect;
export type InsertStamp = z.infer<typeof insertStampSchema>;
export type UserReward = typeof user_rewards.$inferSelect;
export type InsertUserReward = z.infer<typeof insertUserRewardSchema>;
export type Deal = typeof deals.$inferSelect;
export type InsertDeal = z.infer<typeof insertDealSchema>;