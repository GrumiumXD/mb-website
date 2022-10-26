import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/about/About';

import GalleryList from './pages/gallery/GalleryList';
import Layout from './layout/Layout';
import Gallery from './pages/gallery/Gallery';

const queryClient = new QueryClient();

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
