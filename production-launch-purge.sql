-- Production Launch Data Purge Script
-- Purpose: Clean all test data before August 1st launch
-- Created: July 17, 2025
-- WARNING: This script permanently deletes test data. Run with caution.

BEGIN;

-- Create backup tables for test data (for recovery if needed)
CREATE TABLE IF NOT EXISTS test_data_backup_users AS 
SELECT * FROM users WHERE is_test = true;

CREATE TABLE IF NOT EXISTS test_data_backup_businesses AS 
SELECT * FROM businesses WHERE is_test = true;

CREATE TABLE IF NOT EXISTS test_data_backup_deals AS 
SELECT * FROM deals WHERE is_test = true;

-- Display current test data counts
SELECT 'Test Users' as table_name, COUNT(*) as count FROM users WHERE is_test = true
UNION ALL
SELECT 'Test Businesses', COUNT(*) FROM businesses WHERE is_test = true
UNION ALL
SELECT 'Test Deals', COUNT(*) FROM deals WHERE is_test = true
UNION ALL
SELECT 'Test Redemptions', COUNT(*) FROM redemptions WHERE deal_id IN (SELECT id FROM deals WHERE is_test = true)
UNION ALL
SELECT 'Test Saved Deals', COUNT(*) FROM saved_deals WHERE deal_id IN (SELECT id FROM deals WHERE is_test = true)
UNION ALL
SELECT 'Test Staff Profiles', COUNT(*) FROM staff_profiles WHERE business_id IN (SELECT id FROM businesses WHERE is_test = true)
UNION ALL
SELECT 'Test Followed Businesses', COUNT(*) FROM followed_businesses WHERE business_id IN (SELECT id FROM businesses WHERE is_test = true)
UNION ALL
SELECT 'Test Notifications', COUNT(*) FROM notification_logs WHERE user_id IN (SELECT id FROM users WHERE is_test = true);

-- 1. Delete test redemptions (references deals and users)
DELETE FROM redemptions 
WHERE deal_id IN (SELECT id FROM deals WHERE is_test = true)
   OR user_id IN (SELECT id FROM users WHERE is_test = true);

-- 2. Delete test saved deals (references deals and users)
DELETE FROM saved_deals 
WHERE deal_id IN (SELECT id FROM deals WHERE is_test = true)
   OR user_id IN (SELECT id FROM users WHERE is_test = true);

-- 3. Delete test followed businesses (references businesses and users)
DELETE FROM followed_businesses 
WHERE business_id IN (SELECT id FROM businesses WHERE is_test = true)
   OR user_id IN (SELECT id FROM users WHERE is_test = true);

-- 4. Delete test staff profiles (references businesses)
DELETE FROM staff_profiles 
WHERE business_id IN (SELECT id FROM businesses WHERE is_test = true);

-- 5. Delete test business invitations (references businesses)
DELETE FROM business_invitations 
WHERE business_id IN (SELECT id FROM businesses WHERE is_test = true);

-- 6. Delete test notification logs (references users)
DELETE FROM notification_logs 
WHERE user_id IN (SELECT id FROM users WHERE is_test = true);

-- 7. Delete test deals (main test data)
DELETE FROM deals WHERE is_test = true;

-- 8. Delete test businesses (main test data)
DELETE FROM businesses WHERE is_test = true;

-- 9. Delete test users (main test data)
DELETE FROM users WHERE is_test = true;

-- 10. Clean up any orphaned data
DELETE FROM redemptions WHERE deal_id NOT IN (SELECT id FROM deals);
DELETE FROM saved_deals WHERE deal_id NOT IN (SELECT id FROM deals);
DELETE FROM saved_deals WHERE user_id NOT IN (SELECT id FROM users);
DELETE FROM followed_businesses WHERE business_id NOT IN (SELECT id FROM businesses);
DELETE FROM followed_businesses WHERE user_id NOT IN (SELECT id FROM users);
DELETE FROM staff_profiles WHERE business_id NOT IN (SELECT id FROM businesses);
DELETE FROM business_invitations WHERE business_id NOT IN (SELECT id FROM businesses);
DELETE FROM notification_logs WHERE user_id NOT IN (SELECT id FROM users);

-- Display final counts after cleanup
SELECT 'Production Users' as table_name, COUNT(*) as count FROM users WHERE is_test = false OR is_test IS NULL
UNION ALL
SELECT 'Production Businesses', COUNT(*) FROM businesses WHERE is_test = false OR is_test IS NULL
UNION ALL
SELECT 'Production Deals', COUNT(*) FROM deals WHERE is_test = false OR is_test IS NULL
UNION ALL
SELECT 'Total Redemptions', COUNT(*) FROM redemptions
UNION ALL
SELECT 'Total Saved Deals', COUNT(*) FROM saved_deals
UNION ALL
SELECT 'Total Staff Profiles', COUNT(*) FROM staff_profiles
UNION ALL
SELECT 'Total Followed Businesses', COUNT(*) FROM followed_businesses
UNION ALL
SELECT 'Total Notification Logs', COUNT(*) FROM notification_logs;

-- Verify no test data remains
SELECT 'Remaining Test Users' as check_name, COUNT(*) as count FROM users WHERE is_test = true
UNION ALL
SELECT 'Remaining Test Businesses', COUNT(*) FROM businesses WHERE is_test = true
UNION ALL
SELECT 'Remaining Test Deals', COUNT(*) FROM deals WHERE is_test = true;

-- Reset sequences if needed (PostgreSQL specific)
SELECT setval('users_id_seq', COALESCE(MAX(id), 1)) FROM users;
SELECT setval('businesses_id_seq', COALESCE(MAX(id), 1)) FROM businesses;
SELECT setval('deals_id_seq', COALESCE(MAX(id), 1)) FROM deals;
SELECT setval('redemptions_id_seq', COALESCE(MAX(id), 1)) FROM redemptions;
SELECT setval('saved_deals_id_seq', COALESCE(MAX(id), 1)) FROM saved_deals;
SELECT setval('staff_profiles_id_seq', COALESCE(MAX(id), 1)) FROM staff_profiles;
SELECT setval('followed_businesses_id_seq', COALESCE(MAX(id), 1)) FROM followed_businesses;
SELECT setval('notification_logs_id_seq', COALESCE(MAX(id), 1)) FROM notification_logs;

-- Final production readiness check
SELECT 
    'PRODUCTION READY' as status,
    'All test data purged successfully' as message
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE is_test = true
    UNION ALL
    SELECT 1 FROM businesses WHERE is_test = true
    UNION ALL
    SELECT 1 FROM deals WHERE is_test = true
);

COMMIT;

-- Instructions for execution:
-- 1. Run this script in a transaction to allow rollback if needed
-- 2. Verify backup tables were created successfully
-- 3. Check final counts match expectations
-- 4. Confirm no test data remains in production tables
-- 5. Test application functionality after purge
-- 6. Drop backup tables after successful launch (optional)

-- Recovery instructions (if needed):
-- If you need to restore test data for development:
-- INSERT INTO users SELECT * FROM test_data_backup_users;
-- INSERT INTO businesses SELECT * FROM test_data_backup_businesses;  
-- INSERT INTO deals SELECT * FROM test_data_backup_deals;