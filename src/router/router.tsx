import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/ui/layout'
import { useAuthContext } from '@/hooks'
import { DeckPage } from '@/pages/deckPage'
import { DecksPage } from '@/pages/decksPage/decks.page'
import { SignInPage } from '@/pages/signInPage'
import { PrivateRoutes } from '@/router/privateRouters'

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignInPage />,
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
  { element: <DeckPage />, path: '/decks/:deckId' },
]

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
        element: <PublicRoutes />,
      },
    ],
    element: <Layout />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}

function PublicRoutes() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Navigate to={'/'} /> : <Outlet />
}
