import { checkFeatureAccess, PricingTier } from './src/lib/subscriptionService';

// Test the checkFeatureAccess function with 3 different client tiers
type TestCase = {
  clientName: string;
  tier: PricingTier;
  feature: Parameters<typeof checkFeatureAccess>[0];
  dayId?: number;
  expectedAllowed: boolean;
};

const testCases: TestCase[] = [
  // FREE tier client
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'day', dayId: 1, expectedAllowed: true },   // Day 1 - free demo
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'day', dayId: 4, expectedAllowed: true },   // Day 4 - free demo
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'day', dayId: 2, expectedAllowed: false },  // Day 2 - locked
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'day', dayId: 12, expectedAllowed: false }, // Day 12 - locked
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'budget', expectedAllowed: true },          // Budget teaser
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'gifts', expectedAllowed: true },           // Gifts teaser
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'emergency', expectedAllowed: false },      // Emergency - locked
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'ai-card', expectedAllowed: false },       // AI Card - locked
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'printables-basic', expectedAllowed: true }, // Basic printables
  { clientName: 'Client 1 (Free)', tier: 'free', feature: 'printables-full', expectedAllowed: false }, // Full printables - locked

  // STANDARD tier client
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'day', dayId: 1, expectedAllowed: true },
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'day', dayId: 4, expectedAllowed: true },
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'day', dayId: 2, expectedAllowed: true },   // All days unlocked
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'day', dayId: 12, expectedAllowed: true },
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'day', dayId: 24, expectedAllowed: true },
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'budget', expectedAllowed: true },
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'gifts', expectedAllowed: true },
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'emergency', expectedAllowed: false }, // Emergency - premium only
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'ai-card', expectedAllowed: false },  // AI Card - premium only
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'printables-basic', expectedAllowed: true },
  { clientName: 'Client 2 (Standard)', tier: 'standard', feature: 'printables-full', expectedAllowed: false }, // Full printables - premium only

  // PREMIUM tier client
  { clientName: 'Client 3 (Premium)', tier: 'premium', feature: 'day', dayId: 1, expectedAllowed: true },
  { clientName: 'Client 3 (Premium)', tier: 'premium', feature: 'day', dayId: 24, expectedAllowed: true },
  { clientName: 'Client 3 (Premium)', tier: 'premium', feature: 'budget', expectedAllowed: true },
  { clientName: 'Client 3 (Premium)', tier: 'premium', feature: 'gifts', expectedAllowed: true },
  { clientName: 'Client 3 (Premium)', tier: 'premium', feature: 'emergency', expectedAllowed: true },  // Emergency unlocked
  { clientName: 'Client 3 (Premium)', tier: 'premium', feature: 'ai-card', expectedAllowed: true },   // AI Card unlocked
  { clientName: 'Client 3 (Premium)', tier: 'premium', feature: 'printables-basic', expectedAllowed: true },
  { clientName: 'Client 3 (Premium)', tier: 'premium', feature: 'printables-full', expectedAllowed: true }, // Full printables unlocked
];

let passed = 0;
let failed = 0;

console.log('🧪 Testing Tier-Based Feature Access Control\n');
console.log('='.repeat(70));

for (const tc of testCases) {
  const result = checkFeatureAccess(tc.feature, tc.tier, tc.dayId);
  const status = result.allowed === tc.expectedAllowed ? '✅ PASS' : '❌ FAIL';
  
  if (result.allowed === tc.expectedAllowed) {
    passed++;
  } else {
    failed++;
  }

  const dayInfo = tc.dayId ? ` (Day ${tc.dayId})` : '';
  console.log(`${status} ${tc.clientName} | ${tc.feature}${dayInfo}`);
  console.log(`       Expected: ${tc.expectedAllowed ? 'ALLOWED' : 'DENIED'} | Got: ${result.allowed ? 'ALLOWED' : 'DENIED'}`);
  if (!result.allowed && result.reason) {
    console.log(`       Reason: ${result.reason}`);
  }
  console.log('');
}

console.log('='.repeat(70));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${testCases.length} tests`);

if (failed === 0) {
  console.log('\n🎉 All tests passed! The tier-based access control is working correctly.');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Please review the access control logic.');
  process.exit(1);
}