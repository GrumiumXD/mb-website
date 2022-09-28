import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import About from './routes/About';

import Galerie from './routes/Galerie';
import Layout from './routes/layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Layout error />,
    children: [
      {
        path: '',
        element: <About />,
      },
      {
        path: '/images',
        element: <Galerie />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
