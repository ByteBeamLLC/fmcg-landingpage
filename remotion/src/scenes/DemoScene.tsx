import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors, fonts } from "../styles";

// Screenshot sequence with timing
const screenshots = [
  { file: "1.png", label: "Start with an empty schema" },
  { file: "2.png", label: "Add extraction fields" },
  { file: "3.png", label: "Define your data structure" },
  { file: "4.png", label: "Process documents at scale" },
];

export const DemoScene = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Calculate which screenshot to show and transition progress
  const framesPerScreenshot = Math.floor(durationInFrames / screenshots.length);
  const currentIndex = Math.min(
    Math.floor(frame / framesPerScreenshot),
    screenshots.length - 1
  );
  const localFrame = frame - currentIndex * framesPerScreenshot;

  // Transition timing (in frames)
  const transitionDuration = 20;
  const holdDuration = framesPerScreenshot - transitionDuration;

  // Calculate opacity and scale for current screenshot
  const getScreenshotStyle = (index: number) => {
    const isCurrentOrPrev = index === currentIndex || index === currentIndex - 1;

    if (index === currentIndex) {
      // Current screenshot fades/zooms in
      const enterProgress = interpolate(
        localFrame,
        [0, transitionDuration],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        }
      );

      // Exit animation for last frames
      const exitStart = framesPerScreenshot - transitionDuration;
      const exitProgress =
        index < screenshots.length - 1
          ? interpolate(localFrame, [exitStart, framesPerScreenshot], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.in(Easing.cubic),
            })
          : 0;

      return {
        opacity: enterProgress * (1 - exitProgress * 0.3),
        scale: 0.95 + enterProgress * 0.05 - exitProgress * 0.02,
        zIndex: 10,
      };
    }

    if (index === currentIndex - 1 && localFrame < transitionDuration) {
      // Previous screenshot fades out
      const exitProgress = interpolate(
        localFrame,
        [0, transitionDuration],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.in(Easing.cubic),
        }
      );

      return {
        opacity: 1 - exitProgress,
        scale: 1 - exitProgress * 0.05,
        zIndex: 5,
      };
    }

    return { opacity: 0, scale: 1, zIndex: 0 };
  };

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Label animation - changes with each screenshot
  const labelProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 200 },
  });

  const labelY = interpolate(labelProgress, [0, 1], [15, 0]);
  const labelOpacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Progress dots
  const currentScreenshot = screenshots[currentIndex];

  return (
    <AbsoluteFill
      style={{
        background: colors.muted,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          fontFamily: fonts.display,
          color: colors.dark,
          marginBottom: 12,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        See It In Action
      </div>

      {/* Current step label */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 500,
          fontFamily: fonts.sans,
          color: colors.primary,
          marginBottom: 20,
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          textAlign: "center",
        }}
      >
        {currentScreenshot.label}
      </div>

      {/* Screenshot container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 980,
          aspectRatio: "16/10",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px -15px rgba(0,0,0,0.25)",
        }}
      >
        {/* Screenshots layered */}
        {screenshots.map((screenshot, index) => {
          const style = getScreenshotStyle(index);

          if (style.opacity === 0) return null;

          return (
            <div
              key={screenshot.file}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: style.opacity,
                transform: `scale(${style.scale})`,
                zIndex: style.zIndex,
              }}
            >
              <Img
                src={staticFile(screenshot.file)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}

        {/* Subtle border overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: `1px solid rgba(0,0,0,0.08)`,
            borderRadius: 16,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Progress dots */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 24,
        }}
      >
        {screenshots.map((_, index) => {
          const isActive = index === currentIndex;
          const isPast = index < currentIndex;

          return (
            <div
              key={index}
              style={{
                width: isActive ? 28 : 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: isActive
                  ? colors.primary
                  : isPast
                  ? colors.primary
                  : "#d1d5db",
                opacity: isActive ? 1 : isPast ? 0.5 : 0.4,
                transition: "all 0.3s",
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
