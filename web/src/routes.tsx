import { createBrowserRouter } from 'react-router'

import { NotFound } from './pages/404'
import { Home } from './pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: ':url-encurtada',
      //   element: <ShortenedLink />,
      // },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
