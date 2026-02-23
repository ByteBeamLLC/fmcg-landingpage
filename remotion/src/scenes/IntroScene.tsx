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

export const IntroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation - scales in with spring
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tagline animation - delayed fade and slide up
  const taglineProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });

  const taglineY = interpolate(taglineProgress, [0, 1], [30, 0]);
  const taglineOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle animation
  const subtitleProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 200 },
  });

  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);
  const subtitleOpacity = interpolate(frame, [40, 55], [0, 1], {
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
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          marginBottom: 40,
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{
            width: 280,
            height: "auto",
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          color: colors.white,
          fontSize: 48,
          fontWeight: 700,
          fontFamily: fonts.display,
          textAlign: "center",
          transform: `translateY(${taglineY}px)`,
          opacity: taglineOpacity,
          lineHeight: 1.2,
          maxWidth: 800,
        }}
      >
        Build AI Agents Without Code
      </div>

      {/* Subtitle */}
      <div
        style={{
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: 28,
          fontWeight: 500,
          fontFamily: fonts.sans,
          textAlign: "center",
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
          marginTop: 20,
          maxWidth: 700,
        }}
      >
        If you can use a spreadsheet, you can automate document work
      </div>
    </AbsoluteFill>
  );
};
