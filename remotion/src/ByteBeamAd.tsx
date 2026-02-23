import { AbsoluteFill } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { HookScene } from "./scenes/HookScene";
import { IntroScene } from "./scenes/IntroScene";
import { DemoScene } from "./scenes/DemoScene";
import { StatsScene } from "./scenes/StatsScene";
import { CTAScene } from "./scenes/CTAScene";

export const ByteBeamAd = () => {
  // Scene durations in frames (at 30fps)
  // Total target: ~24 seconds = 720 frames
  const HOOK_DURATION = 120;    // 4 sec - "Some work requires judgment. Now it scales."
  const INTRO_DURATION = 100;   // ~3.3 sec - Logo + tagline
  const DEMO_DURATION = 280;    // ~9.3 sec - Table build animation (main content)
  const STATS_DURATION = 110;   // ~3.7 sec - 85%, 99%, 10K+
  const CTA_DURATION = 130;     // ~4.3 sec - Build your first agent

  const TRANSITION_DURATION = 18; // 0.6 sec transitions

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Hook - "Some work requires judgment. Now it scales." */}
        <TransitionSeries.Sequence durationInFrames={HOOK_DURATION}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Intro - ByteBeam logo + tagline */}
        <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Demo - Table build with columns and data */}
        <TransitionSeries.Sequence durationInFrames={DEMO_DURATION}>
          <DemoScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: Stats - Social proof numbers */}
        <TransitionSeries.Sequence durationInFrames={STATS_DURATION}>
          <StatsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: CTA - Build your first agent */}
        <TransitionSeries.Sequence durationInFrames={CTA_DURATION}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
