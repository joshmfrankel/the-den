import { createRoot } from "react-dom/client";
import App from "/src/components/App";

/**
 * Note:
 *
 * Keep entry components in their own files – Entry components should be in a separate file from the one that calls createRoot or they will be remounted on every change.
 *
 * @see https://parceljs.org/recipes/react/#tips
 */
const container = document.getElementById("app");
const root = createRoot(container);

root.render(<App />);
