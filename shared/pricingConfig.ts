// 📦 Tier Pricing Logic – Get Perk'd v4.0
export const TIERS = [
  {
    id: 'starter',
    name: "Starter",
    price: 49,
    includedCampuses: 3,
    addOnEligible: true,
    description: "DFY (Done For You)",
    highlight: "3 campuses",
    modelType: "DFY (Done For You)",
  },
  {
    id: 'growth',
    name: "Growth", 
    price: 69,
    includedCampuses: 6,
    addOnEligible: true,
    description: "DFY (Done For You)",
    highlight: "6 campuses",
    modelType: "DFY (Done For You)",
  },
  {
    id: 'premium',
    name: "Premium",
    price: 149,
    includedCampuses: 9,
    addOnEligible: false,
    description: "Full San Antonio coverage",
    highlight: "Up to 9 campuses",
    modelType: "Full Access",
  },
  {
    id: 'enterprise',
    name: "Enterprise",
    price: 299,
    includedCampuses: 'all',
    includes: ["San Antonio", "San Marcos", "Austin"],
    addOnEligible: false,
    description: "Statewide power",
    highlight: "All 15 campuses", // Updated for trade schools
    modelType: "Statewide Power",
    totalCampuses: 15, // 11 original + 4 new institutions
    enterpriseFeatures: {
      includesTradeSchools: true,
      totalStudents: 191700, // Combined student population
      territoryPlanning: true,
      advancedAnalytics: true,
      geoTargeting: true
    },
  },
];

export const CAMPUS_ADD_ON_PRICE = 10;

export const TIER_UI = {
  badges: true,
  grayOutUnavailable: true,
  upgradeTooltips: true,
  tierSelectorVisible: true,
  modalsEnabled: true,
};

// Helper functions
export const getTierById = (tierId: string) => {
  return TIERS.find(tier => tier.id === tierId) || TIERS[0];
};

export const getTierCampusLimit = (tierId: string): number => {
  const tier = getTierById(tierId);
  return tier.includedCampuses === 'all' ? 11 : tier.includedCampuses as number;
};

export const canAddCampuses = (tierId: string): boolean => {
  const tier = getTierById(tierId);
  return tier.addOnEligible;
};

export const calculateAddOnCost = (addOnCount: number): number => {
  return addOnCount * CAMPUS_ADD_ON_PRICE;
};

export const calculateTotalCost = (tierId: string, addOnCount: number = 0): number => {
  const tier = getTierById(tierId);
  return tier.price + calculateAddOnCost(addOnCount);
};

export const shouldSuggestUpgrade = (tierId: string, addOnCount: number): { suggest: boolean; targetTier?: string; savings?: number } => {
  const currentCost = calculateTotalCost(tierId, addOnCount);
  
  // Starter ($49) + 3 add-ons = $79 → suggest Growth ($69) for better value
  if (tierId === 'starter' && addOnCount >= 2) {
    const growthCost = getTierById('growth').price;
    if (currentCost >= growthCost) {
      return {
        suggest: true,
        targetTier: 'growth',
        savings: currentCost - growthCost
      };
    }
  }
  
  // Growth ($69) + 4 add-ons = $109 → suggest Premium ($149)
  if (tierId === 'growth' && addOnCount >= 4) {
    const premiumCost = getTierById('premium').price;
    if (currentCost >= premiumCost - 40) {
      return {
        suggest: true,
        targetTier: 'premium',
        savings: currentCost - premiumCost
      };
    }
  }
  
  return { suggest: false };
};

export const getProrationMessage = (daysRemaining: number): string => {
  const dailyRate = CAMPUS_ADD_ON_PRICE / 30;
  const proratedAmount = Math.round(dailyRate * daysRemaining * 100) / 100;
  
  return `You'll only pay $${proratedAmount} for the remaining ${daysRemaining} days this month. Full $${CAMPUS_ADD_ON_PRICE} pricing starts next cycle.`;
};

export const UPGRADE_TOOLTIPS = {
  campusLimit: "You've hit your campus limit! Add more campuses for $10/month or upgrade your tier.",
  premiumRequired: "Premium required for full San Antonio access. Upgrade to unlock all 9 campuses.",
  enterpriseUnlocks: "Enterprise unlocks statewide reach with all 11 campuses across SA, San Marcos, and Austin.",
  midMonthProration: "You'll only pay for the remaining days this month. Full pricing starts next cycle.",
};

export const UPGRADE_BANNERS = {
  maximizeReach: "Businesses on Growth plan see 3x more engagement with DFY management.",
  statewide: "Enterprise unlocks all 11 campuses including San Marcos and UT Austin.",
  dfyAdvantage: "All Starter and Growth plans include full Done-For-You management.",
  starterFilling: "Most merchants upgrade within 2 weeks — don't miss your local advantage.",
};