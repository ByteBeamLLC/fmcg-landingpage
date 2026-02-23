# ByteBeam Agent Builder - Social Media Video

## Video Specs
- **Format:** 1080x1080 (Square for LinkedIn/Instagram)
- **Duration:** ~22 seconds
- **FPS:** 30

---

## Final Video Structure

### Scene 1: Hook (0-4 sec)
**"Some work requires judgment. Now it scales."**
- Dark background
- Text animates in with "judgment" highlighted in blue
- "scales" has emphasis animation

### Scene 2: Intro (4-7 sec)
**ByteBeam Logo + Tagline**
- Blue gradient background
- Logo springs in
- "Build AI Agents Without Code"
- "If you can use a spreadsheet, you can automate document work"

### Scene 3: Demo (7-16 sec)
**Invoice Processing Agent Demo**
This is the core of the video - recreates the "Start by adding fields" experience:

1. Empty spreadsheet with "Start by adding fields" message
2. Columns appear progressively with type badges:
   - Input (blue) → Extract (purple) → Cross-Reference (amber) → AI Reasoning (indigo) → Action (green)
3. 6 invoice rows slide in
4. Cells fill with data (shimmer → content animation)
5. Final recommendations: Auto-Approve, Manager Review, Reject

### Scene 4: Stats (16-20 sec)
**Proven Results**
- White background
- 85% Time Saved
- 99% Accuracy
- 10K+ Documents
- "Trusted by Carrefour, Takhlees, InfoQuest & more"

### Scene 5: CTA (20-22 sec)
**Build Your First Agent in Minutes**
- Blue gradient background
- ByteBeam logo
- "Get Started Free" button with pulsing glow
- bytebeam.co

---

## How to Preview

Run the Remotion Studio:
```bash
cd remotion
npm start
```

This opens a browser window where you can:
- Preview the video at any frame
- Play/pause the animation
- Scrub through the timeline

## How to Export

Export the video as MP4:
```bash
cd remotion
npm run build
```

Output will be saved to `remotion/out/bytebeam-ad.mp4`

---

## File Structure

```
remotion/
├── src/
│   ├── index.ts          # Entry point
│   ├── Root.tsx          # Composition definition
│   ├── ByteBeamAd.tsx    # Main composition with transitions
│   ├── styles.ts         # Colors, fonts, demo data
│   └── scenes/
│       ├── HookScene.tsx
│       ├── IntroScene.tsx
│       ├── DemoScene.tsx
│       ├── StatsScene.tsx
│       └── CTAScene.tsx
├── public/
│   ├── logo.png          # ByteBeam logo
│   └── ...               # Other assets
└── package.json
```

---

## Customization

### Adjust Timing
Edit `src/ByteBeamAd.tsx` to change scene durations:
```typescript
const HOOK_DURATION = 120;    // 4 sec
const INTRO_DURATION = 100;   // 3.3 sec
const DEMO_DURATION = 280;    // 9.3 sec
const STATS_DURATION = 110;   // 3.7 sec
const CTA_DURATION = 130;     // 4.3 sec
```

### Change Hook Text
Edit `src/scenes/HookScene.tsx`

### Modify Demo Data
Edit the `demoRows` array in `src/styles.ts`

### Update Stats
Edit `src/scenes/StatsScene.tsx`
