import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors, fonts } from "../styles";

export const CTAScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Text animations
  const headlineProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });

  const headlineY = interpolate(headlineProgress, [0, 1], [40, 0]);
  const headlineOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button animation
  const buttonProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 10 },
  });

  const buttonScale = interpolate(buttonProgress, [0, 1], [0.5, 1]);
  const buttonOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle pulsing glow on button
  const glowIntensity = Math.sin(frame * 0.12) * 0.3 + 0.7;

  // Website text
  const websiteOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.gradient,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoProgress})`,
          marginBottom: 35,
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{
            width: 200,
            height: "auto",
          }}
        />
      </div>

      {/* Headline */}
      <div
        style={{
          color: colors.white,
          fontSize: 46,
          fontWeight: 700,
          fontFamily: fonts.display,
          textAlign: "center",
          transform: `translateY(${headlineY}px)`,
          opacity: headlineOpacity,
          lineHeight: 1.25,
          maxWidth: 750,
          marginBottom: 15,
        }}
      >
        Build Your First Agent
        <br />
        in Minutes
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${buttonScale})`,
          opacity: buttonOpacity,
          marginTop: 25,
        }}
      >
        <div
          style={{
            backgroundColor: colors.white,
            color: colors.primary,
            fontSize: 28,
            fontWeight: 700,
            fontFamily: fonts.sans,
            padding: "20px 50px",
            borderRadius: 14,
            boxShadow: `0 0 ${35 * glowIntensity}px rgba(255, 255, 255, ${
              0.35 * glowIntensity
            })`,
          }}
        >
          Get Started Free
        </div>
      </div>

      {/* Website */}
      <div
        style={{
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: 26,
          fontFamily: fonts.sans,
          fontWeight: 500,
          marginTop: 35,
          opacity: websiteOpacity,
        }}
      >
        bytebeam.co
      </div>
    </AbsoluteFill>
  );
};
