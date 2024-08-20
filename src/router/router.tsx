import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/layout'
import { useAuthContext } from '@/hooks'
import {
  CheckEmailPage,
  DeckPage,
  DecksPage,
  ForgotPasswordPage,
  LearnCardPage,
  NewPasswordPage,
  PageNotFound,
  Profile,
  SignInPage,
  SignUpPage,
} from '@/pages'
import { PrivateRoutes } from '@/router/privateRouters'

export const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <NewPasswordPage />,
        path: `/newPassword/:token`,
      },
      {
        element: <SignInPage />,
        path: '/login',
      },
      {
        element: <SignUpPage />,
        path: '/signUp',
      },
      {
        element: <ForgotPasswordPage />,
        path: '/forgotPassword',
      },
      {
        element: <CheckEmailPage />,
        path: '/checkEmail',
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
  { element: <DeckPage />, path: `/decks/:deckId` },
  { element: <Profile />, path: '/myProfile' },
  { element: <LearnCardPage />, path: `/deck/:id/learn` },
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
      {
        element: <PageNotFound />,
        path: '*',
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
