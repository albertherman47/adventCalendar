# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/tier-access.test.ts >> Tier-based Access Control Tests >> Free tier client - can access Day 1 and Day 4, blocked from Day 2
- Location: tests/tier-access.test.ts:61:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e5]:
    - generic [ref=e6]: "Holiday Early-Bird Offer: Save up to 40% on full lifetime access!"
    - generic [ref=e11]:
      - generic [ref=e12]: 05:41:49
      - button "Claim Offer" [ref=e17] [cursor=pointer]
  - generic [ref=e26]:
    - paragraph [ref=e27]: Máté és Anna (Győr)
    - paragraph [ref=e28]:
      - text: "Véglegesen megvásárolta:"
      - strong [ref=e29]: Prémium Csomag
    - generic [ref=e30]: 5 perce • Azonnali hozzáféréssel
  - banner [ref=e31]:
    - generic [ref=e32]:
      - generic [ref=e33]:
        - img "Christmas Reset 2026 Monogram Logo" [ref=e34] [cursor=pointer]
        - button "Christmas Reset 2026" [ref=e35] [cursor=pointer]
      - navigation [ref=e36]:
        - button "Calendar" [ref=e37] [cursor=pointer]
        - button "AI Card" [ref=e52] [cursor=pointer]
        - button "Tools" [ref=e55] [cursor=pointer]
        - button "Printables" [ref=e58] [cursor=pointer]
        - button "Plans" [ref=e61] [cursor=pointer]
      - generic [ref=e64]:
        - generic [ref=e66] [cursor=pointer]:
          - generic [ref=e67]: Day 1 / 24
          - generic [ref=e68]: 4% done
        - generic [ref=e71]:
          - button "Play Christmas music" [ref=e72] [cursor=pointer]
          - button "Turn off snowfall" [ref=e77] [cursor=pointer]
        - button "🇬🇧 en" [ref=e91] [cursor=pointer]:
          - generic [ref=e92]: 🇬🇧
          - generic [ref=e93]: en
        - button "🔑 Restore" [ref=e97] [cursor=pointer]:
          - generic [ref=e98]: 🔑
          - generic [ref=e99]: Restore
        - button "Start Reset" [ref=e100] [cursor=pointer]
  - main [ref=e101]:
    - generic [ref=e102]:
      - generic [ref=e103]:
        - generic [ref=e104]: Winter Limited Edition • 2026 Atelier
        - generic [ref=e106]: Peace, cadence, and quiet warmth for December evenings
        - generic [ref=e107]: December 1 — 24
      - generic [ref=e108]:
        - generic [ref=e109]:
          - generic [ref=e110]:
            - generic [ref=e111]:
              - generic [ref=e112]: nest_eco_leaf
              - text: CHRISTMAS RESET 2026 • EDITORIAL EDITION
            - heading "Make Christmas feel truly magical again." [level=1] [ref=e113]
            - paragraph [ref=e114]: 24 days to a calmer, more organized Christmas.
            - paragraph [ref=e115]: No more exhausting mall marathons and last-minute scrambles. A rhythmic daily method created to restore the original wonder of winter.
            - generic [ref=e116]:
              - button "Start Your Christmas Reset (9,90 €)" [ref=e117] [cursor=pointer]:
                - generic [ref=e118]: Start Your Christmas Reset
                - generic [ref=e119]: (9,90 €)
              - link "See what's inside arrow_downward" [ref=e120] [cursor=pointer]:
                - /url: "#calendar-preview"
                - generic [ref=e121]: See what's inside
                - generic [ref=e122]: arrow_downward
            - generic [ref=e123]:
              - generic [ref=e124]:
                - generic [ref=e125]: 15 min
                - text: Focused daily ritual
              - generic [ref=e126]:
                - generic [ref=e127]: 9 Guides
                - text: Printable planners
              - generic [ref=e128]:
                - generic [ref=e129]: 100%
                - text: Rush-free serenity
          - generic [ref=e130]:
            - generic [ref=e131]:
              - generic [ref=e132]:
                - generic [ref=e133]:
                  - generic [ref=e134]: ADVENT ATELIER
                  - generic [ref=e135]: "Started: December 1, 2026"
                - heading "The 24-Door Advent Calendar" [level=3] [ref=e136]
              - generic [ref=e137]:
                - generic [ref=e138]: 1/24 Completed ✓
                - generic [ref=e142]: 1. ACTIVE TODAY
            - generic [ref=e147]:
              - generic "1. TODAY • OPEN" [ref=e148] [cursor=pointer]:
                - generic [ref=e149]: "01"
                - generic [ref=e155]:
                  - generic [ref=e156]: TODAY • OPEN
                  - generic [ref=e157]: Budget Plan
              - generic "Dec. 2." [ref=e158] [cursor=pointer]:
                - generic [ref=e160]: "02"
                - generic [ref=e166]: ✦ Mystery...
                - generic [ref=e168]:
                  - generic [ref=e169]: Dec.
                  - generic [ref=e170]: "2."
              - generic "Dec. 3." [ref=e171] [cursor=pointer]:
                - generic [ref=e173]: "03"
                - generic [ref=e179]: ✦ Mystery...
                - generic [ref=e181]:
                  - generic [ref=e182]: Dec.
                  - generic [ref=e183]: "3."
              - generic "4. 20-Min Home Reset" [ref=e184] [cursor=pointer]:
                - generic [ref=e185]: "04"
                - generic [ref=e190]: 20-Min Home Reset
              - generic "Dec. 5." [ref=e191] [cursor=pointer]:
                - generic [ref=e193]: "05"
                - generic [ref=e199]: ✦ Mystery...
                - generic [ref=e201]:
                  - generic [ref=e202]: Dec.
                  - generic [ref=e203]: "5."
              - generic "Dec. 6." [ref=e204] [cursor=pointer]:
                - generic [ref=e206]: "06"
                - generic [ref=e212]: ✦ Mystery...
                - generic [ref=e214]:
                  - generic [ref=e215]: Dec.
                  - generic [ref=e216]: "6."
              - generic "Dec. 7." [ref=e217] [cursor=pointer]:
                - generic [ref=e219]: "07"
                - generic [ref=e225]: ✦ Mystery...
                - generic [ref=e227]:
                  - generic [ref=e228]: Dec.
                  - generic [ref=e229]: "7."
              - generic "Dec. 8." [ref=e230] [cursor=pointer]:
                - generic [ref=e232]: "08"
                - generic [ref=e238]: ✦ Mystery...
                - generic [ref=e240]:
                  - generic [ref=e241]: Dec.
                  - generic [ref=e242]: "8."
              - generic "Dec. 9." [ref=e243] [cursor=pointer]:
                - generic [ref=e245]: "09"
                - generic [ref=e251]: ✦ Mystery...
                - generic [ref=e253]:
                  - generic [ref=e254]: Dec.
                  - generic [ref=e255]: "9."
              - generic "Dec. 10." [ref=e256] [cursor=pointer]:
                - generic [ref=e258]: "10"
                - generic [ref=e264]: ✦ Mystery...
                - generic [ref=e266]:
                  - generic [ref=e267]: Dec.
                  - generic [ref=e268]: "10."
              - generic "Dec. 11." [ref=e269] [cursor=pointer]:
                - generic [ref=e271]: "11"
                - generic [ref=e277]: ✦ Mystery...
                - generic [ref=e279]:
                  - generic [ref=e280]: Dec.
                  - generic [ref=e281]: "11."
              - generic "Dec. 12." [ref=e282] [cursor=pointer]:
                - generic [ref=e284]: "12"
                - generic [ref=e290]: ✦ Mystery...
                - generic [ref=e292]:
                  - generic [ref=e293]: Dec.
                  - generic [ref=e294]: "12."
              - generic "Dec. 13." [ref=e295] [cursor=pointer]:
                - generic [ref=e297]: "13"
                - generic [ref=e303]: ✦ Mystery...
                - generic [ref=e305]:
                  - generic [ref=e306]: Dec.
                  - generic [ref=e307]: "13."
              - generic "Dec. 14." [ref=e308] [cursor=pointer]:
                - generic [ref=e310]: "14"
                - generic [ref=e316]: ✦ Mystery...
                - generic [ref=e318]:
                  - generic [ref=e319]: Dec.
                  - generic [ref=e320]: "14."
              - generic "Dec. 15." [ref=e321] [cursor=pointer]:
                - generic [ref=e323]: "15"
                - generic [ref=e329]: ✦ Mystery...
                - generic [ref=e331]:
                  - generic [ref=e332]: Dec.
                  - generic [ref=e333]: "15."
              - generic "Dec. 16." [ref=e334] [cursor=pointer]:
                - generic [ref=e336]: "16"
                - generic [ref=e342]: ✦ Mystery...
                - generic [ref=e344]:
                  - generic [ref=e345]: Dec.
                  - generic [ref=e346]: "16."
              - generic "Dec. 17." [ref=e347] [cursor=pointer]:
                - generic [ref=e349]: "17"
                - generic [ref=e355]: ✦ Mystery...
                - generic [ref=e357]:
                  - generic [ref=e358]: Dec.
                  - generic [ref=e359]: "17."
              - generic "Dec. 18." [ref=e360] [cursor=pointer]:
                - generic [ref=e362]: "18"
                - generic [ref=e368]: ✦ Mystery...
                - generic [ref=e370]:
                  - generic [ref=e371]: Dec.
                  - generic [ref=e372]: "18."
              - generic "Dec. 19." [ref=e373] [cursor=pointer]:
                - generic [ref=e375]: "19"
                - generic [ref=e381]: ✦ Mystery...
                - generic [ref=e383]:
                  - generic [ref=e384]: Dec.
                  - generic [ref=e385]: "19."
              - generic "Dec. 20." [ref=e386] [cursor=pointer]:
                - generic [ref=e388]: "20"
                - generic [ref=e394]: ✦ Mystery...
                - generic [ref=e396]:
                  - generic [ref=e397]: Dec.
                  - generic [ref=e398]: "20."
              - generic "Dec. 21." [ref=e399] [cursor=pointer]:
                - generic [ref=e401]: "21"
                - generic [ref=e407]: ✦ Mystery...
                - generic [ref=e409]:
                  - generic [ref=e410]: Dec.
                  - generic [ref=e411]: "21."
              - generic "Dec. 22." [ref=e412] [cursor=pointer]:
                - generic [ref=e414]: "22"
                - generic [ref=e420]: ✦ Mystery...
                - generic [ref=e422]:
                  - generic [ref=e423]: Dec.
                  - generic [ref=e424]: "22."
              - generic "Dec. 23." [ref=e425] [cursor=pointer]:
                - generic [ref=e427]: "23"
                - generic [ref=e433]: ✦ Mystery...
                - generic [ref=e435]:
                  - generic [ref=e436]: Dec.
                  - generic [ref=e437]: "23."
              - generic "24. CHRISTMAS EVE" [ref=e438] [cursor=pointer]:
                - generic [ref=e439]: "24"
                - generic [ref=e443]:
                  - generic [ref=e444]: CHRISTMAS EVE
                  - generic [ref=e445]: Christmas Eve Peace
            - generic [ref=e446]:
              - generic [ref=e447]: "Modeled after classic tactile calendars: sealed doors hold mystery, while completed days glow warmly."
              - button "Open Calendar →" [ref=e452] [cursor=pointer]
        - generic [ref=e454]:
          - generic [ref=e455]:
            - generic [ref=e456]: spa
            - generic [ref=e458]:
              - 'heading "The Reset Philosophy: No rush, zero stress, step by mindful step." [level=2] [ref=e459]'
              - paragraph [ref=e460]: A calm seasonal organization system designed for busy winter days. Instead of cramming everything into one chaotic weekend, you gently resolve one single detail each morning.
          - generic [ref=e461]: 15-MINUTE ATELIER METHOD
      - generic [ref=e464]:
        - generic [ref=e465]:
          - generic [ref=e466]: DIAGNOSIS & RESOLUTION
          - heading "Christmas should be pure joy. Not another exhausting project." [level=2] [ref=e467]
          - paragraph [ref=e468]: We identified the 5 primary bottlenecks stealing holiday peace and crafted elegant, practical tools for each.
        - generic [ref=e469]:
          - generic [ref=e470] [cursor=pointer]:
            - generic [ref=e471]:
              - generic [ref=e472]: featured_seasonal_and_gifts
              - generic [ref=e474]: "01"
              - heading "Too many gifts to buy?" [level=3] [ref=e475]
              - paragraph [ref=e476]: Chaotic scattered notes and fear of forgetting someone special.
            - generic [ref=e477]:
              - generic [ref=e478]: Atelier Solution
              - generic [ref=e479]: Gift Planner & Assistant
              - generic [ref=e480]: Delivery tracking, sizing, personalized ideas and budget caps.
          - generic [ref=e481] [cursor=pointer]:
            - generic [ref=e482]:
              - generic [ref=e483]: account_balance_wallet
              - generic [ref=e485]: "02"
              - heading "Unsure how much it will all cost?" [level=3] [ref=e486]
              - paragraph [ref=e487]: Small expenses adding up quietly and creating seasonal anxiety.
            - generic [ref=e488]:
              - generic [ref=e489]: Atelier Solution
              - generic [ref=e490]: Holiday Budget Planner
              - generic [ref=e491]: Category spending caps, emergency buffers and real balance.
          - generic [ref=e492] [cursor=pointer]:
            - generic [ref=e493]:
              - generic [ref=e494]: timer
              - generic [ref=e496]: "03"
              - heading "Too many unfinished tasks?" [level=3] [ref=e497]
              - paragraph [ref=e498]: Paralysis when facing a sprawling 40-item December to-do list.
            - generic [ref=e499]:
              - generic [ref=e500]: Atelier Solution
              - generic [ref=e501]: Daily Reset (15 min)
              - generic [ref=e502]: One single micro-action each morning with zero pressure.
          - generic [ref=e503] [cursor=pointer]:
            - generic [ref=e504]:
              - generic [ref=e505]: restaurant_menu
              - generic [ref=e507]: "04"
              - heading "Holiday menu becoming too complex?" [level=3] [ref=e508]
              - paragraph [ref=e509]: Excess cooking, food waste and exhausting lonely hours in the kitchen.
            - generic [ref=e510]:
              - generic [ref=e511]: Atelier Solution
              - generic [ref=e512]: Menu & Prep Timeline
              - generic [ref=e513]: Oven timeline for Dec 24 and aisle-by-aisle grocery checklist.
          - generic [ref=e514] [cursor=pointer]:
            - generic [ref=e515]:
              - generic [ref=e516]: warning_amber
              - generic [ref=e518]: "05"
              - heading "Holidays arriving too fast?" [level=3] [ref=e519]
              - paragraph [ref=e520]: Started late and feeling the clock ticking against you.
            - generic [ref=e521]:
              - generic [ref=e522]: Atelier Solution
              - generic [ref=e523]: Emergency Express Mode
              - generic [ref=e524]: Condensed 48h express plan focused only on what truly matters.
      - generic [ref=e525]:
        - generic [ref=e526]:
          - generic [ref=e527]: WHY RESET?
          - 'heading "How It Works: 3 Simple Steps" [level=2] [ref=e528]'
          - paragraph [ref=e529]: No clunky apps or tedious signups. Opens smoothly in any browser on phone, tablet, or laptop.
        - generic [ref=e530]:
          - generic [ref=e531]:
            - generic [ref=e532]: "01"
            - generic [ref=e533]:
              - generic [ref=e534]: meeting_room
              - generic [ref=e536]: 01. STEP
              - heading "Get your digital access" [level=3] [ref=e537]
              - paragraph [ref=e538]: Gain instant, lifetime access to the 2026 digital calendar and all printable planners.
            - generic [ref=e539]:
              - generic [ref=e540]: check
              - generic [ref=e541]: This is a 100% digital product. No physical items will be shipped.
          - generic [ref=e542]:
            - generic [ref=e543]: "02"
            - generic [ref=e544]:
              - generic [ref=e545]: hourglass_empty
              - generic [ref=e547]: 02. STEP
              - heading "Open one door each day" [level=3] [ref=e548]
              - paragraph [ref=e549]: From December 1 to 24, unlock a fresh interactive tool, checklist, or soul-warming moment.
            - generic [ref=e550]:
              - generic [ref=e551]: check
              - generic [ref=e552]: This is a 100% digital product. No physical items will be shipped.
          - generic [ref=e553]:
            - generic [ref=e554]: "03"
            - generic [ref=e555]:
              - generic [ref=e556]: night_shelter
              - generic [ref=e558]: 03. STEP
              - heading "Savor a small festive step" [level=3] [ref=e559]
              - paragraph [ref=e560]: In just 5–15 minutes, cross off a practical prep step or immerse yourself in a peaceful holiday ritual.
            - generic [ref=e561]:
              - generic [ref=e562]: check
              - generic [ref=e563]: This is a 100% digital product. No physical items will be shipped.
      - generic [ref=e565]:
        - generic [ref=e566]:
          - generic [ref=e567]:
            - generic [ref=e568]: INSIDE THE EXPERIENCE
            - heading "Daily Dashboard • Dec 1" [level=2] [ref=e569]
          - generic [ref=e570]: "Active since: December 1, 2026"
        - generic [ref=e573]:
          - generic [ref=e574]:
            - generic [ref=e575]:
              - generic [ref=e576]: "01"
              - generic [ref=e577]:
                - generic [ref=e578]: You are on track with your reset
                - text: 1 of 24 days completed (4%) • 88 days until Christmas Eve
            - generic [ref=e580]:
              - generic [ref=e581]: ADVENT PROGRESS
              - generic [ref=e582]: 4%
          - generic [ref=e585]:
            - generic [ref=e586]:
              - generic [ref=e587]:
                - generic [ref=e588]: Today's Focus
                - generic [ref=e593]: 10 minutes
              - 'heading "Day 1: Christmas Budget" [level=3] [ref=e598]'
              - generic [ref=e599]: „Brew a cup of warm herbal tea with lemon before you start. Treat budgeting as a loving gift to your January self.”
              - paragraph [ref=e600]: Knowing upfront your budget for gifts, feasts, and decorations eliminates 80% of December stress. This interactive tool automatically calculates allocation and displays your remaining balance in real time.
              - generic [ref=e601]:
                - button "Open Calendar (10 minutes)" [ref=e602] [cursor=pointer]
                - button "download Guide PDF" [ref=e607] [cursor=pointer]:
                  - generic [ref=e608]: download
                  - generic [ref=e609]: Guide PDF
            - generic [ref=e610]:
              - heading "1. daily steps 1 / 3 Done" [level=4] [ref=e611]:
                - generic [ref=e612]: 1. daily steps
                - generic [ref=e613]: 1 / 3 Done
              - generic [ref=e614]:
                - generic [ref=e615] [cursor=pointer]:
                  - checkbox "Enter the maximum total budget you wish to dedicate to this festive season." [checked] [ref=e616]
                  - generic [ref=e617]: Enter the maximum total budget you wish to dedicate to this festive season.
                - generic [ref=e618] [cursor=pointer]:
                  - 'checkbox "Allocate amounts across categories: Gifts, Holiday Dinners & Groceries, Decorations, Wardrobe & Self-Care, Outings." [ref=e619]'
                  - generic [ref=e620]: "Allocate amounts across categories: Gifts, Holiday Dinners & Groceries, Decorations, Wardrobe & Self-Care, Outings."
                - generic [ref=e621] [cursor=pointer]:
                  - checkbox "Reserve a 10% emergency buffer for unexpected delights or expenses." [ref=e622]
                  - generic [ref=e623]: Reserve a 10% emergency buffer for unexpected delights or expenses.
              - generic [ref=e624]:
                - generic [ref=e625]: favorite
                - generic [ref=e626]: "Daily ritual: Each checkmark brings you closer to a calm, mindful holiday."
          - generic [ref=e627]:
            - generic [ref=e628]: UPCOMING DAYS IN CALENDAR
            - generic [ref=e629]:
              - generic [ref=e630] [cursor=pointer]:
                - generic [ref=e631]: "02"
                - generic [ref=e632]:
                  - generic [ref=e633]: TOMORROW
                  - generic [ref=e638]: Gift List & Wrapping Tracker
                  - generic [ref=e639]: ✦ Mysterious surprise
              - generic [ref=e640] [cursor=pointer]:
                - generic [ref=e641]: "03"
                - generic [ref=e642]:
                  - generic [ref=e643]: IN 2 DAYS
                  - generic [ref=e648]: December Master Schedule
                  - generic [ref=e649]: ✦ Mysterious surprise
              - generic [ref=e650] [cursor=pointer]:
                - generic [ref=e651]: "04"
                - generic [ref=e652]:
                  - generic [ref=e653]: WEEKEND
                  - generic [ref=e658]: 20-Minute Home Reset
                  - generic [ref=e659]: ✦ Mysterious surprise
      - generic [ref=e660]:
        - generic [ref=e661]:
          - generic [ref=e662]:
            - generic [ref=e663]: PRINTABLES
            - heading "Printables" [level=2] [ref=e664]
            - paragraph [ref=e665]: Meticulously crafted printable and digital stationery worksheets for stress-free holiday planning.
          - generic [ref=e666]:
            - generic [ref=e667]: Format A4 & US Letter
            - generic [ref=e668]: PDF & Excel
        - generic [ref=e669]:
          - generic [ref=e670]:
            - generic [ref=e671]:
              - generic [ref=e672]:
                - generic [ref=e673]: PDF & Print
                - generic [ref=e674]: Finance & Control 2026
              - heading "Christmas Budget Worksheet 2026" [level=3] [ref=e675]
              - paragraph [ref=e676]: Complete worksheet to set your hard spending cap, distribute across gifts, festive meals, decor, and emergency buffer with real vs. planned tracking.
            - generic [ref=e677]:
              - generic [ref=e678]: 1 Page A4 • Ledger
              - button "Preview arrow_forward" [ref=e679] [cursor=pointer]:
                - generic [ref=e680]: Preview
                - generic [ref=e681]: arrow_forward
          - generic [ref=e682]:
            - generic [ref=e683]:
              - generic [ref=e684]:
                - generic [ref=e685]: PDF & Print
                - generic [ref=e686]: Tree & Gifts
              - heading "Gifts & Wrapping Master Tracker" [level=3] [ref=e687]
              - paragraph [ref=e688]: Organized in concentric circles of loved ones, with discrete check-boxes for purchased and wrapped, plus room for handwritten card notes.
            - generic [ref=e689]:
              - generic [ref=e690]: 2 Pages A4 • Comprehensive
              - button "Preview arrow_forward" [ref=e691] [cursor=pointer]:
                - generic [ref=e692]: Preview
                - generic [ref=e693]: arrow_forward
          - generic [ref=e694]:
            - generic [ref=e695]:
              - generic [ref=e696]:
                - generic [ref=e697]: PDF & Print
                - generic [ref=e698]: Pantry & Kitchen
              - heading "Smart Festive Grocery & Pantry List" [level=3] [ref=e699]
              - paragraph [ref=e700]: "Separated into supermarket sections: Dry goods, Dairy, Meat & Fish, Fresh produce, Holiday spices and Drinks to avoid zig-zagging aisles."
            - generic [ref=e701]:
              - generic [ref=e702]: 1 Page A4 • Aisles
              - button "Preview arrow_forward" [ref=e703] [cursor=pointer]:
                - generic [ref=e704]: Preview
                - generic [ref=e705]: arrow_forward
          - generic [ref=e706]:
            - generic [ref=e707]:
              - generic [ref=e708]:
                - generic [ref=e709]: PDF & Print
                - generic [ref=e710]: Royal Gastronomy
              - heading "Grand Holiday Feast Menu Planner" [level=3] [ref=e711]
              - paragraph [ref=e712]: Harmonious layout with ornate flourishes for hors d'oeuvres, main roast, sides, desserts and drink pairing with a prep-ahead schedule.
            - generic [ref=e713]:
              - generic [ref=e714]: 1 Page A4 • Menu
              - button "Preview arrow_forward" [ref=e715] [cursor=pointer]:
                - generic [ref=e716]: Preview
                - generic [ref=e717]: arrow_forward
          - generic [ref=e718]:
            - generic [ref=e719]:
              - generic [ref=e720]:
                - generic [ref=e721]: PDF & Print
                - generic [ref=e722]: Vintage Stationery
              - heading "Set of 4 Bespoke Holiday Cards" [level=3] [ref=e723]
              - paragraph [ref=e724]: Four timeless botanical cards with postal border trim, ready to be printed on thick paper and inscribed with personal warm wishes.
            - generic [ref=e725]:
              - generic [ref=e726]: 4 Designs • Cardstock
              - button "Preview arrow_forward" [ref=e727] [cursor=pointer]:
                - generic [ref=e728]: Preview
                - generic [ref=e729]: arrow_forward
          - generic [ref=e730]:
            - generic [ref=e731]:
              - generic [ref=e732]:
                - generic [ref=e733]: PDF & Print
                - generic [ref=e734]: Joy & Family
              - heading "Holiday Family Games & Trivia Cards" [level=3] [ref=e735]
              - paragraph [ref=e736]: Printable and cuttable card decks featuring 'Who in the family...', Christmas trivia, and cozy storytelling prompts for screen-free evenings.
            - generic [ref=e737]:
              - generic [ref=e738]: 3 Pages A4 • 30 Cards
              - button "Preview arrow_forward" [ref=e739] [cursor=pointer]:
                - generic [ref=e740]: Preview
                - generic [ref=e741]: arrow_forward
          - generic [ref=e742]:
            - generic [ref=e743]:
              - generic [ref=e744]:
                - generic [ref=e745]: PDF & Print
                - generic [ref=e746]: Cinema & Blankets
              - heading "Christmas Movie Night & Snack Kit" [level=3] [ref=e747]
              - paragraph [ref=e748]: Interactive holiday movie bucket list, cut-out golden cinema tickets for the kids, and secret recipes for thick spiced cocoa.
            - generic [ref=e749]:
              - generic [ref=e750]: 1 Page A4 • Tickets & Guide
              - button "Preview arrow_forward" [ref=e751] [cursor=pointer]:
                - generic [ref=e752]: Preview
                - generic [ref=e753]: arrow_forward
          - generic [ref=e754]:
            - generic [ref=e755]:
              - generic [ref=e756]:
                - generic [ref=e757]: PDF & Print
                - generic [ref=e758]: Peace & Ritual
              - heading "Slow Christmas Morning Blueprint" [level=3] [ref=e759]
              - paragraph [ref=e760]: "Step-by-step hygge morning blueprint for December 25th: fresh coffee rituals, relaxed gift unwrapping, and cozy acoustic carols."
            - generic [ref=e761]:
              - generic [ref=e762]: 1 Page A4 • Timeline
              - button "Preview arrow_forward" [ref=e763] [cursor=pointer]:
                - generic [ref=e764]: Preview
                - generic [ref=e765]: arrow_forward
          - generic [ref=e766]:
            - generic [ref=e767]:
              - generic [ref=e768]:
                - generic [ref=e769]: PDF & Print
                - generic [ref=e770]: Rescue & Serenity
              - 'heading "The Savior Checklist: “Did I Forget Anything?”" [level=3] [ref=e771]'
              - paragraph [ref=e772]: The 10 easily forgotten essentials that save Christmas Eve (toy batteries, extra scissors, matches, ironed clothes, charged cameras).
            - generic [ref=e773]:
              - generic [ref=e774]: 1 Page A4 • 10 Points
              - button "Preview arrow_forward" [ref=e775] [cursor=pointer]:
                - generic [ref=e776]: Preview
                - generic [ref=e777]: arrow_forward
        - generic [ref=e778]:
          - generic [ref=e779]:
            - generic [ref=e780]: ✨ CREATIVE ATELIER
            - heading "Christmas Card Studio & Print" [level=3] [ref=e782]
            - paragraph [ref=e783]: Create personalized, heartfelt Christmas greeting cards and print them ready to fold on A4 paper!
          - button "Create Card Now arrow_forward" [ref=e784] [cursor=pointer]:
            - generic [ref=e785]: Create Card Now
            - generic [ref=e786]: arrow_forward
      - generic [ref=e788]:
        - generic [ref=e789]:
          - generic [ref=e790]: PRICING
          - heading "Choose Your Christmas Reset" [level=2] [ref=e791]
          - paragraph [ref=e792]: One small investment for a whole month of calm and festive joy.
        - generic [ref=e793]:
          - generic [ref=e794]:
            - generic [ref=e795]:
              - generic [ref=e796]: FREE
              - generic [ref=e798]:
                - generic [ref=e799]: 0 €
                - generic [ref=e800]: free
              - paragraph [ref=e801]: Sample the Christmas Reset experience with essential introductory tools.
              - list [ref=e802]:
                - listitem [ref=e803]:
                  - generic [ref=e804]: check
                  - text: Sample calendar experience
                - listitem [ref=e805]:
                  - generic [ref=e806]: check
                  - text: Full Day 1 preview (Christmas Budget)
                - listitem [ref=e807]:
                  - generic [ref=e808]: check
                  - text: Basic Christmas preparation checklist
                - listitem [ref=e809]:
                  - generic [ref=e810]: check
                  - text: Selected free holiday content
                - listitem [ref=e811]:
                  - generic [ref=e812]: check
                  - text: Timely email reminder signup
            - button "Try it free" [ref=e813] [cursor=pointer]
          - generic [ref=e814]:
            - generic [ref=e815]:
              - generic [ref=e816]: STANDARD
              - generic [ref=e818]:
                - generic [ref=e819]: 9.90 €
                - generic [ref=e820]: one-time
              - paragraph [ref=e821]: The core essentials for an organized and serene December.
              - list [ref=e822]:
                - listitem [ref=e823]:
                  - generic [ref=e824]: check
                  - text: Full access to all 24 Advent doors
                - listitem [ref=e825]:
                  - generic [ref=e826]: check
                  - text: All interactive planners & calculators
                - listitem [ref=e827]:
                  - generic [ref=e828]: check
                  - text: Interactive Christmas Budget Planner
                - listitem [ref=e829]:
                  - generic [ref=e830]: check
                  - text: Interactive Gift Planner with budget tracking
                - listitem [ref=e831]:
                  - generic [ref=e832]: check
                  - text: Room-by-room home reset checklists
                - listitem [ref=e833]:
                  - generic [ref=e834]: check
                  - text: Core Gift Helper recommendation tool
                - listitem [ref=e835]:
                  - generic [ref=e836]: check
                  - text: Automatic local progress tracking
                - listitem [ref=e837]:
                  - generic [ref=e838]: check
                  - text: Selected printable resources
            - button "Get Christmas Reset" [ref=e839] [cursor=pointer]
          - generic [ref=e840]:
            - generic [ref=e841]: Most Popular
            - generic [ref=e842]:
              - generic [ref=e843]:
                - generic [ref=e844]: PREMIUM
                - generic [ref=e845]: auto_awesome
              - generic [ref=e846]:
                - generic [ref=e847]: 14.90 €
                - generic [ref=e848]: one-time
              - paragraph [ref=e849]: "Our complete tier: includes all interactive tools, emergency mode, and full printable bundle."
              - list [ref=e850]:
                - listitem [ref=e851]:
                  - generic [ref=e852]: check_circle
                  - text: Everything in Standard tier
                - listitem [ref=e853]:
                  - generic [ref=e854]: check_circle
                  - text: Complete printable workbook pack (A4 PDF)
                - listitem [ref=e855]:
                  - generic [ref=e856]: check_circle
                  - text: Christmas Emergency Mode (30d / 14d / 7d / 3d / eve)
                - listitem [ref=e857]:
                  - generic [ref=e858]: check_circle
                  - text: Advanced Gift Helper with smart suggestions
                - listitem [ref=e859]:
                  - generic [ref=e860]: check_circle
                  - text: Interactive Holiday Menu & Grocery Planner
                - listitem [ref=e861]:
                  - generic [ref=e862]: check_circle
                  - text: Printable Christmas Cards & Gift Tags collection
                - listitem [ref=e863]:
                  - generic [ref=e864]: check_circle
                  - text: Interactive Family Games & Holiday Trivia
                - listitem [ref=e865]:
                  - generic [ref=e866]: check_circle
                  - text: Additional holiday activities & bonus resources
            - button "Get Premium" [ref=e867] [cursor=pointer]
        - generic [ref=e868]:
          - generic [ref=e869]:
            - generic [ref=e870]:
              - generic [ref=e871]: lock
              - generic [ref=e872]: 100% Secure payment
            - generic [ref=e873]: •
            - generic [ref=e874]: Instant digital access immediately upon purchase.
            - generic [ref=e875]: •
            - generic [ref=e876]: Digital Product • Instant Access • Lifetime access to 2026 edition
          - button "key Already purchased? Restore your access here" [ref=e878] [cursor=pointer]:
            - generic [ref=e879]: key
            - generic [ref=e880]: Already purchased? Restore your access here
      - generic [ref=e881]:
        - generic [ref=e882]:
          - generic [ref=e883]: FAQ
          - heading "Frequently Asked Questions" [level=2] [ref=e884]
          - paragraph [ref=e885]: Everything you need to know about Christmas Reset 2026.
        - generic [ref=e886]:
          - group [ref=e887]:
            - generic "What exactly am I buying? expand_more" [ref=e888] [cursor=pointer]:
              - generic [ref=e889]: What exactly am I buying?
              - generic [ref=e890]: expand_more
          - group [ref=e891]:
            - generic "Is this a physical product? Will I receive a package? expand_more" [ref=e892] [cursor=pointer]:
              - generic [ref=e893]: Is this a physical product? Will I receive a package?
              - generic [ref=e894]: expand_more
          - group [ref=e895]:
            - generic "When can I start? expand_more" [ref=e896] [cursor=pointer]:
              - generic [ref=e897]: When can I start?
              - generic [ref=e898]: expand_more
          - group [ref=e899]:
            - generic "Can I use it on my phone? expand_more" [ref=e900] [cursor=pointer]:
              - generic [ref=e901]: Can I use it on my phone?
              - generic [ref=e902]: expand_more
          - group [ref=e903]:
            - generic "Can I print the resources? expand_more" [ref=e904] [cursor=pointer]:
              - generic [ref=e905]: Can I print the resources?
              - generic [ref=e906]: expand_more
          - group [ref=e907]:
            - generic "Can I give it as a gift? expand_more" [ref=e908] [cursor=pointer]:
              - generic [ref=e909]: Can I give it as a gift?
              - generic [ref=e910]: expand_more
      - generic [ref=e912]:
        - generic [ref=e913]: favorite
        - heading "Make December a warm memory, not a race against the clock." [level=2] [ref=e915]
        - paragraph [ref=e916]: Join thousands who replaced holiday chaos with clear rituals, quiet confidence, and true presence with those who matter most.
        - generic [ref=e917]:
          - button "Start Your Reset Today (9.90 €)" [ref=e918] [cursor=pointer]
          - link "Explore the Calendar" [ref=e919] [cursor=pointer]:
            - /url: "#calendar-preview"
        - generic [ref=e920]: 2026 Edition • Crafted with care for peaceful homes
  - generic [ref=e922]:
    - generic [ref=e923]:
      - generic [ref=e924]: Welcome to Christmas Reset 2026
      - heading "Select Language / Nyelvválasztás" [level=2] [ref=e929]
      - paragraph [ref=e930]: All calendar doors, interactive tools, guides, and planners will adapt seamlessly to your choice.
    - generic [ref=e932]:
      - button "Hungarian Magyar HU Teljes adventi kalendárium és tervezők magyarul Magyarország & Kárpát-medence" [ref=e933] [cursor=pointer]:
        - img "Hungarian" [ref=e934]: 🇭🇺
        - generic [ref=e935]:
          - generic [ref=e936]:
            - generic [ref=e937]: Magyar
            - generic [ref=e938]: HU
          - paragraph [ref=e939]: Teljes adventi kalendárium és tervezők magyarul
          - generic [ref=e940]: Magyarország & Kárpát-medence
      - button "English English EN International English edition & all printables International / Worldwide" [ref=e943] [cursor=pointer]:
        - img "English" [ref=e944]: 🇬🇧
        - generic [ref=e945]:
          - generic [ref=e946]:
            - generic [ref=e947]: English
            - generic [ref=e948]: EN
          - paragraph [ref=e949]: International English edition & all printables
          - generic [ref=e950]: International / Worldwide
      - button "German Deutsch DE Vollständige deutsche Ausgabe & Vorlagen Deutschland, Österreich, Schweiz" [ref=e956] [cursor=pointer]:
        - img "German" [ref=e957]: 🇩🇪
        - generic [ref=e958]:
          - generic [ref=e959]:
            - generic [ref=e960]: Deutsch
            - generic [ref=e961]: DE
          - paragraph [ref=e962]: Vollständige deutsche Ausgabe & Vorlagen
          - generic [ref=e963]: Deutschland, Österreich, Schweiz
      - button "Romanian Română RO Calendar complet de advent și ghiduri practice România & Moldova" [ref=e966] [cursor=pointer]:
        - img "Romanian" [ref=e967]: 🇷🇴
        - generic [ref=e968]:
          - generic [ref=e969]:
            - generic [ref=e970]: Română
            - generic [ref=e971]: RO
          - paragraph [ref=e972]: Calendar complet de advent și ghiduri practice
          - generic [ref=e973]: România & Moldova
      - button "Polish Polski PL Polska edycja świątecznego kalendarza Polska" [ref=e976] [cursor=pointer]:
        - img "Polish" [ref=e977]: 🇵🇱
        - generic [ref=e978]:
          - generic [ref=e979]:
            - generic [ref=e980]: Polski
            - generic [ref=e981]: PL
          - paragraph [ref=e982]: Polska edycja świątecznego kalendarza
          - generic [ref=e983]: Polska
      - button "Czech Čeština CZ Česká edice vánočního adventního kalendáře Česká republika" [ref=e986] [cursor=pointer]:
        - img "Czech" [ref=e987]: 🇨🇿
        - generic [ref=e988]:
          - generic [ref=e989]:
            - generic [ref=e990]: Čeština
            - generic [ref=e991]: CZ
          - paragraph [ref=e992]: Česká edice vánočního adventního kalendáře
          - generic [ref=e993]: Česká republika
      - button "Slovak Slovenčina SK Slovenská edícia adventného sprievodcu Slovensko" [ref=e996] [cursor=pointer]:
        - img "Slovak" [ref=e997]: 🇸🇰
        - generic [ref=e998]:
          - generic [ref=e999]:
            - generic [ref=e1000]: Slovenčina
            - generic [ref=e1001]: SK
          - paragraph [ref=e1002]: Slovenská edícia adventného sprievodcu
          - generic [ref=e1003]: Slovensko
    - generic [ref=e1006]:
      - generic [ref=e1007]: You can change your language anytime from the menu.
      - button "Enter Christmas Reset ✦" [ref=e1012] [cursor=pointer]:
        - generic [ref=e1013]: Enter Christmas Reset
        - generic [ref=e1014]: ✦
  - contentinfo [ref=e1015]:
    - generic [ref=e1016]:
      - generic [ref=e1017]:
        - generic [ref=e1018]:
          - generic [ref=e1019]:
            - img "Christmas Reset 2026 Monogram Logo" [ref=e1020]
            - generic [ref=e1021]: Christmas Reset 2026
          - paragraph [ref=e1022]: 24 days to a calmer, more organized Christmas. Open one door every day. Do one small thing. Truly enjoy the festive season.
          - generic [ref=e1023]:
            - generic [ref=e1024]: language
            - generic [ref=e1025]: English Edition
        - generic [ref=e1026]:
          - heading "Navigation" [level=4] [ref=e1027]
          - button "Advent Calendar" [ref=e1028] [cursor=pointer]
          - button "Emergency Mode" [ref=e1029] [cursor=pointer]
          - button "Printables" [ref=e1030] [cursor=pointer]
          - button "Pricing" [ref=e1031] [cursor=pointer]
          - link "FAQ" [ref=e1032] [cursor=pointer]:
            - /url: "#faq-section"
        - generic [ref=e1033]:
          - heading "Tools" [level=4] [ref=e1034]
          - button "Holiday Budget Planner" [ref=e1035] [cursor=pointer]
          - button "Gift Helper" [ref=e1036] [cursor=pointer]
          - button "Holiday Menu Planner" [ref=e1037] [cursor=pointer]
          - button "Emergency Mode" [ref=e1038] [cursor=pointer]
        - generic [ref=e1039]:
          - heading "Language:" [level=4] [ref=e1040]
          - button "🇬🇧 English (EN) Change Language" [ref=e1041] [cursor=pointer]:
            - generic [ref=e1042]: 🇬🇧
            - generic [ref=e1043]:
              - generic [ref=e1044]: English (EN)
              - generic [ref=e1045]: Change Language
          - button "Supabase DB Status & Live Test" [ref=e1050] [cursor=pointer]:
            - generic [ref=e1055]:
              - generic [ref=e1056]: Supabase DB
              - generic [ref=e1059]: Status & Live Test
          - generic [ref=e1060]:
            - generic [ref=e1061]: 100% Digital Product
            - generic [ref=e1062]: Instant digital access immediately upon purchase.
      - generic [ref=e1063]:
        - paragraph [ref=e1064]: © 2026 Christmas Reset. All rights reserved.
        - generic [ref=e1065]: Crafted with care to bring back peaceful joy and calm to the winter holidays.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL = 'http://localhost:3000';
  4   | 
  5   | // Helper to set up a client with specific tier in localStorage
  6   | async function setupClient(page: any, tier: 'free' | 'standard' | 'premium', clientName: string) {
  7   |   await page.goto(BASE_URL);
> 8   |   await page.waitForLoadState('networkidle');
      |              ^ Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
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
  108 |   });
```