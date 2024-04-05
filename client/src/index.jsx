import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Router specific
import { RouterProvider } from 'react-router-dom';

/**
 * Note:
 *
 * Keep entry components in their own files – Entry components should be in a separate file from the one that calls createRoot or they will be remounted on every change.
 *
 * @see https://parceljs.org/recipes/react/#tips
 */
const container = document.getElementById('router');
const root = createRoot(container);

import { router } from '/src/config/routes';

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
