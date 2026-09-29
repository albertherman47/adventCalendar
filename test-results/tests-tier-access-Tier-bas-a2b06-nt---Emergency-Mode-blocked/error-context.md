# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/tier-access.test.ts >> Tier-based Access Control Tests >> Free tier client - Emergency Mode blocked
- Location: tests/tier-access.test.ts:95:3

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL = 'http://localhost:3000';
  4   | 
  5   | // Helper to set up a client with specific tier in localStorage
  6   | async function setupClient(page: any, tier: 'free' | 'standard' | 'premium', clientName: string) {
> 7   |   await page.goto(BASE_URL);
      |              ^ Error: page.goto: Target page, context or browser has been closed
  8   |   await page.waitForLoadState('networkidle');
  9   |   
  10  |   // Clear any existing state
  11  |   await page.evaluate(() => {
  12  |     localStorage.clear();
  13  |   });
  14  |   
  15  |   // Set up the tier in localStorage
  16  |   await page.evaluate((t) => {
  17  |     const DEFAULT_PROGRESS = {
  18  |       hasPurchased: t !== 'free',
  19  |       selectedTier: t,
  20  |       isPreviewMode: false,
  21  |       completedDays: [1],
  22  |       unlockedDays: t === 'free' ? [1, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  23  |       emergencyCompletedTasks: {},
  24  |       budgetData: {
  25  |         totalBudget: 2500,
  26  |         items: [
  27  |           { category: 'Cadouri Familie & Partener', allocated: 1200, actual: 0, label: 'Cadouri Familie & Partener' },
  28  |           { category: 'Cadouri Prieteni & Colegi', allocated: 400, actual: 0, label: 'Cadouri Prieteni & Colegi' },
  29  |           { category: 'Masa de Crăciun & Băcănie', allocated: 600, actual: 0, label: 'Masa de Crăciun & Băcănie' },
  30  |           { category: 'Decorațiuni & Brad', allocated: 150, actual: 0, label: 'Decorațiuni & Brad' },
  31  |           { category: 'Rezervă Urgențe', allocated: 150, actual: 0, label: 'Rezervă Urgențe' },
  32  |         ],
  33  |       },
  34  |       giftList: [
  35  |         { id: '1', recipient: 'Mama', category: 'parent', idea: 'Pulover călduros din lână', budget: 200, purchased: true, wrapped: false },
  36  |         { id: '2', recipient: 'Partener', category: 'partner', idea: 'Weekend de SPA în ianuarie', budget: 350, purchased: false, wrapped: false },
  37  |         { id: '3', recipient: 'Ana (Prietena cea mai bună)', category: 'friend', idea: 'Cană artizanală ceramică & carte', budget: 120, purchased: false, wrapped: false },
  38  |       ],
  39  |       checklistStates: {
  40  |         'day4_step_0': true,
  41  |         'day4_step_1': true,
  42  |       },
  43  |       userNotes: {
  44  |         1: 'Am stabilit un buget realist anul acesta pentru a nu mai avea griji în ianuarie.',
  45  |       },
  46  |     };
  47  |     localStorage.setItem('christmas_reset_progress_2026', JSON.stringify(DEFAULT_PROGRESS));
  48  |     localStorage.setItem('christmas_reset_lang_selected_2026', 'true');
  49  |     localStorage.setItem('christmas_reset_lang_2026', 'hu');
  50  |   }, tier);
  51  |   
  52  |   // Reload to apply the new state
  53  |   await page.reload();
  54  |   await page.waitForLoadState('networkidle');
  55  |   
  56  |   console.log(`✅ ${clientName} (${tier}) configured`);
  57  | }
  58  | 
  59  | test.describe('Tier-based Access Control Tests', () => {
  60  |   
  61  |   test('Free tier client - can access Day 1 and Day 4, blocked from Day 2', async ({ page }) => {
  62  |     await setupClient(page, 'free', 'Client 1 (Free)');
  63  |     
  64  |     // Navigate to calendar
  65  |     await page.click('text=Naptár');
  66  |     await page.waitForTimeout(500);
  67  |     
  68  |     // Day 1 should be accessible (free demo)
  69  |     const day1Button = page.locator('[data-day-id="1"]').first();
  70  |     await expect(day1Button).toBeVisible();
  71  |     
  72  |     // Day 4 should be accessible (free demo)
  73  |     const day4Button = page.locator('[data-day-id="4"]').first();
  74  |     await expect(day4Button).toBeVisible();
  75  |     
  76  |     // Day 2 should show as locked
  77  |     const day2Button = page.locator('[data-day-id="2"]').first();
  78  |     await expect(day2Button).toBeVisible();
  79  |     
  80  |     // Click Day 2 - should show paywall modal
  81  |     await day2Button.click();
  82  |     await page.waitForTimeout(500);
  83  |     
  84  |     // Check paywall modal appears
  85  |     const paywallModal = page.locator('text=Teljes Adventi Kalendáriumhoz Kötött');
  86  |     await expect(paywallModal).toBeVisible();
  87  |     
  88  |     // Close modal
  89  |     await page.click('button:has-text("×")');
  90  |     await page.waitForTimeout(300);
  91  |     
  92  |     console.log('✅ Free tier: Day 1 & 4 accessible, Day 2 blocked correctly');
  93  |   });
  94  | 
  95  |   test('Free tier client - Emergency Mode blocked', async ({ page }) => {
  96  |     await setupClient(page, 'free', 'Client 1 (Free)');
  97  |     
  98  |     // Navigate to Emergency Mode
  99  |     await page.click('text=Vészhelyzet Mód');
  100 |     await page.waitForTimeout(500);
  101 |     
  102 |     // Should see paywall for emergency mode
  103 |     const paywallModal = page.locator('text=Karácsonyi Vészhelyzet Mód');
  104 |     await expect(paywallModal).toBeVisible();
  105 |     
  106 |     await page.click('button:has-text("×")');
  107 |     console.log('✅ Free tier: Emergency Mode blocked correctly');
```