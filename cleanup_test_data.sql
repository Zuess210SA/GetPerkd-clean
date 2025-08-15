-- Get Perk'd Test Data Cleanup Script
-- Run this script before production launch to remove all test data

-- WARNING: This will permanently delete test data. Use with caution.
-- Make sure to backup your database before running this script.

-- Step 1: Delete test notifications and logs
DELETE FROM notification_logs WHERE user_id IN (
    SELECT id FROM users WHERE is_test = true
);

-- Step 2: Delete test redemptions
DELETE FROM redemptions WHERE user_id IN (
    SELECT id FROM users WHERE is_test = true
);

-- Step 3: Delete test saved deals
DELETE FROM saved_deals WHERE user_id IN (
    SELECT id FROM users WHERE is_test = true
);

-- Step 4: Delete test follows
DELETE FROM followed_businesses WHERE user_id IN (
    SELECT id FROM users WHERE is_test = true
);

-- Step 5: Delete test deals
DELETE FROM deals WHERE is_test = true;

-- Step 6: Delete test businesses
DELETE FROM businesses WHERE is_test = true;

-- Step 7: Delete test users
DELETE FROM users WHERE is_test = true;

-- Step 8: Reset sequence counters if needed (optional)
-- This ensures new IDs start from a clean slate
-- SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1));
-- SELECT setval('businesses_id_seq', COALESCE((SELECT MAX(id) FROM businesses), 1));
-- SELECT setval('deals_id_seq', COALESCE((SELECT MAX(id) FROM deals), 1));

-- Step 9: Verification queries (run these to confirm cleanup)
SELECT 'Test Users' as table_name, COUNT(*) as remaining_test_records FROM users WHERE is_test = true
UNION ALL
SELECT 'Test Businesses', COUNT(*) FROM businesses WHERE is_test = true
UNION ALL
SELECT 'Test Deals', COUNT(*) FROM deals WHERE is_test = true;

-- If all counts are 0, cleanup was successful!

-- Step 10: Production readiness check
-- Run this query to see what's left in the database
SELECT 
    'Users' as table_name, 
    COUNT(*) as total_records,
    COUNT(CASE WHEN is_test = true THEN 1 END) as test_records,
    COUNT(CASE WHEN is_test = false THEN 1 END) as production_records
FROM users
UNION ALL
SELECT 
    'Businesses',
    COUNT(*),
    COUNT(CASE WHEN is_test = true THEN 1 END),
    COUNT(CASE WHEN is_test = false THEN 1 END)
FROM businesses
UNION ALL
SELECT 
    'Deals',
    COUNT(*),
    COUNT(CASE WHEN is_test = true THEN 1 END),
    COUNT(CASE WHEN is_test = false THEN 1 END)
FROM deals;

-- IMPORTANT: After running this script, remember to:
-- 1. Set VITE_TEST_MODE=false in your environment variables
-- 2. Remove /test-notifications and admin routes from production
-- 3. Rotate your ADMIN_API_KEY
-- 4. Test the application thoroughly with production settings