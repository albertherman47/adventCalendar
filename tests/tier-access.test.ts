import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// Helper to set up a client with specific tier in localStorage
async function setupClient(page: any, tier: 'free' | 'standard' | 'premium', clientName: string) {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  
  // Clear any existing state
  await page.evaluate(() => {
    localStorage.clear();
  });
  
  // Set up the tier in localStorage
  await page.evaluate((t) => {
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

  test('Standard tier client - all days accessible', async ({ page }) => {
    await setupClient(page, 'standard', 'Client 2 (Standard)');
    
    // Navigate to calendar
    await page.click('text=Naptár');
    await page.waitForTimeout(500);
    
    // All days should be accessible (no lock icons)
    for (let day = 1; day <= 24; day++) {
      const dayButton = page.locator(`[data-day-id="${day}"]`).first();
      await expect(dayButton).toBeVisible();
    }
    
    // Click Day 12 - should open day modal, not paywall
    await page.locator('[data-day-id="12"]').first().click();
    await page.waitForTimeout(500);
    
    const dayModal = page.locator('[role="dialog"]').first();
    await expect(dayModal).toBeVisible();
    
    // Should NOT see paywall
    const paywallModal = page.locator('text=Teljes Adventi Kalendáriumhoz Kötött');
    await expect(paywallModal).not.toBeVisible();
    
    await page.click('button:has-text("×")');
    console.log('✅ Standard tier: All 24 days accessible');
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

  test('Premium tier client - everything accessible', async ({ page }) => {
    await setupClient(page, 'premium', 'Client 3 (Premium)');
    
    // Navigate to calendar
    await page.click('text=Naptár');
    await page.waitForTimeout(500);
    
    // All days accessible
    for (let day = 1; day <= 24; day++) {
      const dayButton = page.locator(`[data-day-id="${day}"]`).first();
      await expect(dayButton).toBeVisible();
    }
    
    // Click Day 24 - should open day modal
    await page.locator('[data-day-id="24"]').first().click();
    await page.waitForTimeout(500);
    
    const dayModal = page.locator('[role="dialog"]').first();
    await expect(dayModal).toBeVisible();
    
    await page.click('button:has-text("×")');
    console.log('✅ Premium tier: All 24 days accessible');
  });

  test('Premium tier client - Emergency Mode accessible', async ({ page }) => {
    await setupClient(page, 'premium', 'Client 3 (Premium)');
    
    // Navigate to Emergency Mode
    await page.click('text=Vészhelyzet Mód');
    await page.waitForTimeout(500);
    
    // Should NOT see paywall - should see the emergency mode content
    const paywallModal = page.locator('text=Karácsonyi Vészhelyzet Mód');
    await expect(paywallModal).not.toBeVisible();
    
    // Check for emergency mode content
    const emergencyContent = page.locator('text=Vészhelyzet');
    await expect(emergencyContent.first()).toBeVisible();
    
    console.log('✅ Premium tier: Emergency Mode accessible');
  });

  test('Premium tier client - AI Card Studio accessible', async ({ page }) => {
    await setupClient(page, 'premium', 'Client 3 (Premium)');
    
    // Navigate to AI Card Studio
    await page.click('text=AI Képeslap');
    await page.waitForTimeout(500);
    
    // Should NOT see paywall - should see the card studio content
    const paywallModal = page.locator('text=Prémium Funkció');
    await expect(paywallModal).not.toBeVisible();
    
    // Check for card studio content
    const cardStudio = page.locator('text=Képeslap');
    await expect(cardStudio.first()).toBeVisible();
    
    console.log('✅ Premium tier: AI Card Studio accessible');
  });

  test('Premium tier client - Full Printables accessible', async ({ page }) => {
    await setupClient(page, 'premium', 'Client 3 (Premium)');
    
    // Navigate to Printables
    await page.click('text=Letölthető');
    await page.waitForTimeout(500);
    
    // Should see printable resources without paywall for full access
    const printablesContent = page.locator('text=Munkalapok');
    await expect(printablesContent.first()).toBeVisible();
    
    console.log('✅ Premium tier: Full Printables accessible');
  });
});