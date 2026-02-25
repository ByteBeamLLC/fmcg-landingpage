import { useReducedMotion } from "framer-motion";

export function useAnimationConfig() {
  const shouldReduceMotion = useReducedMotion();

  return {
    shouldReduceMotion,
    transition: shouldReduceMotion ? { duration: 0 } : undefined,
    initial: shouldReduceMotion ? false : undefined,
  };
}
