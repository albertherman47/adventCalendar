import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// Simulate a user tampering with localStorage. Paid tiers must still require
// an authenticated Supabase account and a database entitlement.
async function setupClient(page: any, tier: 'free' | 'standard' | 'premium', clientName: string) {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  
  // Clear any existing state
  await page.evaluate(() => {
    localStorage.clear();
  });
  
  // Set up the tier in localStorage
  await page.evaluate((t: 'free' | 'standard' | 'premium') => {
    const DEFAULT_PROGRESS = {
      hasPurchased: t !== 'free',
      selectedTier: t,
      isPreviewMode: false,
      completedDays: [1],
      unlockedDays: t === 'free' ? [1, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      emergencyCompletedTasks: {},
      budgetData: {
        totalBudget: 2500,
        items: [
          { category: 'Cadouri Familie & Partener', allocated: 1200, actual: 0, label: 'Cadouri Familie & Partener' },
          { category: 'Cadouri Prieteni & Colegi', allocated: 400, actual: 0, label: 'Cadouri Prieteni & Colegi' },
          { category: 'Masa de Crăciun & Băcănie', allocated: 600, actual: 0, label: 'Masa de Crăciun & Băcănie' },
          { category: 'Decorațiuni & Brad', allocated: 150, actual: 0, label: 'Decorațiuni & Brad' },
          { category: 'Rezervă Urgențe', allocated: 150, actual: 0, label: 'Rezervă Urgențe' },
        ],
      },
      giftList: [
        { id: '1', recipient: 'Mama', category: 'parent', idea: 'Pulover călduros din lână', budget: 200, purchased: true, wrapped: false },
        { id: '2', recipient: 'Partener', category: 'partner', idea: 'Weekend de SPA în ianuarie', budget: 350, purchased: false, wrapped: false },
        { id: '3', recipient: 'Ana (Prietena cea mai bună)', category: 'friend', idea: 'Cană artizanală ceramică & carte', budget: 120, purchased: false, wrapped: false },
      ],
      checklistStates: {
        'day4_step_0': true,
        'day4_step_1': true,
      },
      userNotes: {
        1: 'Am stabilit un buget realist anul acesta pentru a nu mai avea griji în ianuarie.',
      },
    };
    localStorage.setItem('christmas_reset_progress_2026', JSON.stringify(DEFAULT_PROGRESS));
    localStorage.setItem('christmas_reset_lang_selected_2026', 'true');
    localStorage.setItem('christmas_reset_lang_2026', 'hu');
  }, tier);
  
  // Reload to apply the new state
  await page.reload();
  await page.waitForLoadState('networkidle');
  
  console.log(`✅ ${clientName} (${tier}) configured`);
}

test.describe('Tier-based Access Control Tests', () => {
  
  test('Free tier client - can access Day 1 and Day 4, blocked from Day 2', async ({ page }) => {
    await setupClient(page, 'free', 'Client 1 (Free)');
    
    // Navigate to calendar
    await page.click('text=Naptár');
    await page.waitForTimeout(500);
    
    // Day 1 should be accessible (free demo)
    const day1Button = page.locator('[data-day-id="1"]').first();
    await expect(day1Button).toBeVisible();
    
    // Day 4 should be accessible (free demo)
    const day4Button = page.locator('[data-day-id="4"]').first();
    await expect(day4Button).toBeVisible();
    
    // Day 2 should show as locked
    const day2Button = page.locator('[data-day-id="2"]').first();
    await expect(day2Button).toBeVisible();
    
    // Click Day 2 - should show paywall modal
    await day2Button.click();
    await page.waitForTimeout(500);
    
    // Check paywall modal appears
    const paywallModal = page.locator('text=Teljes Adventi Kalendáriumhoz Kötött');
    await expect(paywallModal).toBeVisible();
    
    // Close modal
    await page.click('button:has-text("×")');
    await page.waitForTimeout(300);
    
    console.log('✅ Free tier: Day 1 & 4 accessible, Day 2 blocked correctly');
  });

  test('Free tier client - Emergency Mode blocked', async ({ page }) => {
    await setupClient(page, 'free', 'Client 1 (Free)');
    
    // Navigate to Emergency Mode
    await page.click('text=Vészhelyzet Mód');
    await page.waitForTimeout(500);
    
    // Should see paywall for emergency mode
    const paywallModal = page.locator('text=Karácsonyi Vészhelyzet Mód');
    await expect(paywallModal).toBeVisible();
    
    await page.click('button:has-text("×")');
    console.log('✅ Free tier: Emergency Mode blocked correctly');
  });

  test('Free tier client - AI Card Studio blocked', async ({ page }) => {
    await setupClient(page, 'free', 'Client 1 (Free)');
    
    // Navigate to AI Card Studio
    await page.click('text=AI Képeslap');
    await page.waitForTimeout(500);
    
    // Should see paywall for AI Card
    const paywallModal = page.locator('text=Prémium Funkció');
    await expect(paywallModal).toBeVisible();
    
    await page.click('button:has-text("×")');
    console.log('✅ Free tier: AI Card Studio blocked correctly');
  });

  test('Spoofed Standard tier in localStorage does not unlock paid days', async ({ page }) => {
    await setupClient(page, 'standard', 'Client 2 (Standard)');
    
    // Navigate to calendar
    await page.click('text=Naptár');
    await page.waitForTimeout(500);
    
    // Day metadata is visible, but the protected content remains locked.
    await page.locator('[data-day-id="12"]').first().click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=TELJES ADVENTI CSOMAGHOZ KÖTÖTT')).toBeVisible();
    console.log('✅ A browser-stored Standard tier did not grant access');
  });

  test('Standard tier client - Emergency Mode blocked', async ({ page }) => {
    await setupClient(page, 'standard', 'Client 2 (Standard)');
    
    // Navigate to Emergency Mode
    await page.click('text=Vészhelyzet Mód');
    await page.waitForTimeout(500);
    
    // Should see paywall for emergency mode (premium only)
    const paywallModal = page.locator('text=Karácsonyi Vészhelyzet Mód');
    await expect(paywallModal).toBeVisible();
    
    await page.click('button:has-text("×")');
    console.log('✅ Standard tier: Emergency Mode blocked (Premium only)');
  });

  test('Standard tier client - AI Card Studio blocked', async ({ page }) => {
    await setupClient(page, 'standard', 'Client 2 (Standard)');
    
    // Navigate to AI Card Studio
    await page.click('text=AI Képeslap');
    await page.waitForTimeout(500);
    
    // Should see paywall for AI Card (premium only)
    const paywallModal = page.locator('text=Prémium Funkció');
    await expect(paywallModal).toBeVisible();
    
    await page.click('button:has-text("×")');
    console.log('✅ Standard tier: AI Card Studio blocked (Premium only)');
  });

  test('Spoofed Premium tier in localStorage does not unlock paid days', async ({ page }) => {
    await setupClient(page, 'premium', 'Client 3 (Premium)');
    
    // Navigate to calendar
    await page.click('text=Naptár');
    await page.waitForTimeout(500);
    
    // A forged local plan cannot open the server-protected day content.
    await page.locator('[data-day-id="24"]').first().click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=TELJES ADVENTI CSOMAGHOZ KÖTÖTT')).toBeVisible();
    console.log('✅ A browser-stored Premium tier did not grant access');
  });

  test('Spoofed Premium tier cannot open Emergency Mode', async ({ page }) => {
    await setupClient(page, 'premium', 'Client 3 (Premium)');
    
    // Navigate to Emergency Mode
    await page.click('text=Vészhelyzet Mód');
    await page.waitForTimeout(500);
    
    // Route-level access uses the account entitlement, not localStorage.
    const paywallModal = page.locator('text=Karácsonyi Vészhelyzet Mód');
    await expect(paywallModal).toBeVisible();
    console.log('✅ A browser-stored Premium tier did not unlock Emergency Mode');
  });

  test('Spoofed Premium tier cannot open AI Card Studio', async ({ page }) => {
    await setupClient(page, 'premium', 'Client 3 (Premium)');
    
    // Navigate to AI Card Studio
    await page.click('text=AI Képeslap');
    await page.waitForTimeout(500);
    
    // AI access is checked by the app and again by its server endpoint.
    const paywallModal = page.locator('text=Prémium Funkció');
    await expect(paywallModal).toBeVisible();
    console.log('✅ A browser-stored Premium tier did not unlock AI Card Studio');
  });

  test('Spoofed Premium tier does not unlock full Printables', async ({ page }) => {
    await setupClient(page, 'premium', 'Client 3 (Premium)');
    
    // Navigate to Printables
    await page.click('text=Letölthető');
    await page.waitForTimeout(500);
    
    // The catalogue is visible, but its paid resources remain protected.
    const printablesContent = page.locator('text=Munkalapok');
    await expect(printablesContent.first()).toBeVisible();
    await page.getByRole('button', { name: 'Feloldás' }).first().click();
    await expect(page.locator('text=Prémium Nyomtatható Munkalapok')).toBeVisible();
    console.log('✅ A browser-stored Premium tier did not unlock full Printables');
  });
});
