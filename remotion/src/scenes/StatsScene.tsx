import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors, fonts } from "../styles";

export const StatsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: 85, suffix: "%", label: "Time Saved" },
    { value: 99, suffix: "%", label: "Accuracy" },
    { value: 10, suffix: "K+", label: "Documents" },
  ];

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Title */}
      <div
        style={{
          color: colors.dark,
          fontSize: 40,
          fontWeight: 700,
          fontFamily: fonts.display,
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        Proven Results
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "flex",
          gap: 50,
          justifyContent: "center",
        }}
      >
        {stats.map((stat, index) => {
          const delay = 20 + index * 15;

          // Number counting animation
          const countProgress = interpolate(
            frame,
            [delay, delay + 35],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          const currentValue = Math.round(stat.value * countProgress);

          // Scale animation
          const scaleProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12 },
          });

          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Pulse effect when complete
          const pulseFrame = delay + 35;
          const pulse =
            frame > pulseFrame && frame < pulseFrame + 8
              ? 1 + (1 - (frame - pulseFrame) / 8) * 0.08
              : 1;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scale(${scaleProgress * pulse})`,
                opacity,
              }}
            >
              <div
                style={{
                  fontSize: 88,
                  fontWeight: 800,
                  fontFamily: fonts.display,
                  background: colors.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                }}
              >
                {currentValue}
                {stat.suffix}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: colors.dark,
                  fontFamily: fonts.sans,
                  marginTop: 8,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust badges */}
      <div
        style={{
          marginTop: 50,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: interpolate(frame, [70, 90], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontSize: 16,
            color: colors.mutedForeground,
            fontFamily: fonts.sans,
          }}
        >
          Trusted by Carrefour, Takhlees, InfoQuest & more
        </span>
      </div>
    </AbsoluteFill>
  );
};
