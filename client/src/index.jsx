import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '/src/components/App';

// Router specific
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '/src/routes/root';
import ErrorPage from '/src/routes/ErrorPage';
import TaskPage from '/src/routes/TaskPage';

/**
 * Note:
 *
 * Keep entry components in their own files – Entry components should be in a separate file from the one that calls createRoot or they will be remounted on every change.
 *
 * @see https://parceljs.org/recipes/react/#tips
 */
const container = document.getElementById('router');
const root = createRoot(container);

/**
 * @todo abstract outside index.jsx?
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'tasks',
    element: <TaskPage />,
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
