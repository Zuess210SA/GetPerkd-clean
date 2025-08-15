-- Mark existing test users and data for safe testing
-- Run this to convert current test environment to use proper test flags

-- Step 1: Mark test users (adjust email patterns as needed)
UPDATE users 
SET is_test = true 
WHERE email LIKE '%test%' 
   OR email LIKE '%demo%' 
   OR email LIKE '%sample%'
   OR username LIKE '%test%'
   OR username LIKE '%demo%'
   OR username LIKE '%sample%';

-- Step 2: Mark test businesses (adjust names as needed)
UPDATE businesses 
SET is_test = true 
WHERE name LIKE '%test%' 
   OR name LIKE '%demo%' 
   OR name LIKE '%sample%'
   OR name LIKE '%Pizza Rio%'
   OR name LIKE '%Dallah Med%'
   OR name LIKE '%Toro Bowl%'
   OR name LIKE '%Tony%';

-- Step 3: Mark test deals (based on test businesses)
UPDATE deals 
SET is_test = true 
WHERE business_id IN (
    SELECT id FROM businesses WHERE is_test = true
);

-- Step 4: Verification - check what we marked
SELECT 'Test Users' as category, COUNT(*) as count FROM users WHERE is_test = true
UNION ALL
SELECT 'Test Businesses', COUNT(*) FROM businesses WHERE is_test = true
UNION ALL
SELECT 'Test Deals', COUNT(*) FROM deals WHERE is_test = true;

-- Step 5: Optional - mark specific user IDs if you know them
-- UPDATE users SET is_test = true WHERE id IN (1, 2, 3);

-- Step 6: Production users check (these should be the real ones)
SELECT 'Production Users' as category, COUNT(*) as count FROM users WHERE is_test = false
UNION ALL
SELECT 'Production Businesses', COUNT(*) FROM businesses WHERE is_test = false
UNION ALL
SELECT 'Production Deals', COUNT(*) FROM deals WHERE is_test = false;