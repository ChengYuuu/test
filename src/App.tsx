import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TimeSeriesPage from './pages/TimeSeriesPage';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TimeSeriesPage />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
};

export default App;
