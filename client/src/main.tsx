import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Dispatch event for prerenderer to know when the app is ready
// This is used by vite-plugin-prerender to capture the rendered HTML
window.addEventListener("load", () => {
  // Give React time to hydrate/render all components
  setTimeout(() => {
    document.dispatchEvent(new Event("render-complete"));
  }, 100);
});
