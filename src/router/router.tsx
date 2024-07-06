import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { DecksPage } from '@/pages/decks.page'
import { PrivateRoutes } from '@/router/privateRouters'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
]

export function Router() {
  return <RouterProvider router={router} />
}

export const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])
