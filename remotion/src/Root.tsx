import { Composition } from "remotion";
import { ByteBeamAd } from "./ByteBeamAd";

export const RemotionRoot = () => {
  // Calculate total duration accounting for transition overlaps
  // Scenes: 120 + 100 + 280 + 110 + 130 = 740
  // Transitions: 4 × 18 = 72 (subtracted due to overlap)
  // Total: 740 - 72 = 668 frames ≈ 22.3 seconds
  const TOTAL_DURATION = 668;

  return (
    <Composition
      id="ByteBeamAd"
      component={ByteBeamAd}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
