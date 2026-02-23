import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors, fonts } from "../styles";

export const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1: "Some work requires judgment."
  const line1Progress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const line1Opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const line1Y = interpolate(line1Progress, [0, 1], [30, 0]);

  // "judgment" highlight animation
  const highlightDelay = 25;
  const highlightProgress = interpolate(
    frame,
    [highlightDelay, highlightDelay + 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Line 2: "Now it scales."
  const line2Delay = 50;
  const line2Progress = spring({
    frame: frame - line2Delay,
    fps,
    config: { damping: 200 },
  });

  const line2Opacity = interpolate(frame, [line2Delay, line2Delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  // "scales" emphasis animation
  const scalesDelay = line2Delay + 25;
  const scalesScale = spring({
    frame: frame - scalesDelay,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Line 1 */}
      <div
        style={{
          opacity: line1Opacity,
          transform: `translateY(${line1Y}px)`,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            color: colors.white,
            fontSize: 56,
            fontWeight: 600,
            fontFamily: fonts.display,
            lineHeight: 1.3,
          }}
        >
          Some work requires{" "}
        </span>
        <span
          style={{
            fontSize: 56,
            fontWeight: 700,
            fontFamily: fonts.display,
            lineHeight: 1.3,
            background: `linear-gradient(90deg, ${colors.primary} ${highlightProgress * 100}%, ${colors.white} ${highlightProgress * 100}%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          judgment
        </span>
        <span
          style={{
            color: colors.white,
            fontSize: 56,
            fontWeight: 600,
            fontFamily: fonts.display,
            lineHeight: 1.3,
          }}
        >
          .
        </span>
      </div>

      {/* Line 2 */}
      <div
        style={{
          opacity: line2Opacity,
          transform: `translateY(${line2Y}px)`,
        }}
      >
        <span
          style={{
            color: colors.white,
            fontSize: 56,
            fontWeight: 600,
            fontFamily: fonts.display,
            lineHeight: 1.3,
          }}
        >
          Now it{" "}
        </span>
        <span
          style={{
            color: colors.primary,
            fontSize: 56,
            fontWeight: 700,
            fontFamily: fonts.display,
            lineHeight: 1.3,
            display: "inline-block",
            transform: `scale(${0.8 + scalesScale * 0.2})`,
          }}
        >
          scales
        </span>
        <span
          style={{
            color: colors.white,
            fontSize: 56,
            fontWeight: 600,
            fontFamily: fonts.display,
            lineHeight: 1.3,
          }}
        >
          .
        </span>
      </div>
    </AbsoluteFill>
  );
};
