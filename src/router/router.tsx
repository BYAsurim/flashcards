import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { SignIn } from '@/components/auth'
import { Layout } from '@/components/ui/layout'
import { DecksPage } from '@/pages/decksPage/decks.page'
import { PrivateRoutes } from '@/router/privateRouters'

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignIn />,
        path: '/login',
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
]

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
