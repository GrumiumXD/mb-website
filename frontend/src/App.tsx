import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/about/About';

import GalleryList from './pages/gallery/GalleryList';
import Layout from './layout/Layout';
import Gallery from './pages/gallery/Gallery';

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
        path: '/gallery',
        element: <GalleryList />,
        loader: async () => fetch(`/api/gallery`),
        children: [
          {
            path: ':index',
            element: <Gallery />,
            loader: async ({ params }) => fetch(`/api/gallery/${params.index}`),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
