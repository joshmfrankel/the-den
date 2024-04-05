/**
 * React Router
 */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '/src/routes/HomePage';
import ErrorPage from '/src/routes/ErrorPage';
import TaskPage from '/src/routes/TaskPage';
import BoardIndexPage from '/src/routes/Boards/index';
import BoardShowPage from '/src/routes/Boards/show';

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/tasks',
    element: <TaskPage />,
  },
  {
    path: '/boards',
    element: <BoardIndexPage />,
  },
  {
    path: '/boards/:id',
    element: <BoardShowPage />,
  }
]);
