import { createBrowserRouter, RouteObject } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import DefaultLayout from '@/layouts/default'
import HomePage from '@/home/home.page'

export const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        // element: <SidebarFooterLayout />,
        children: [
          {
            path: ROUTES.HOME,
            index: true,
            element: <HomePage />,
            // handle: { title: 'Triage' },
            // errorElement: <GeneralError />,
          },

          {
            path: '*',
            element: <div>Not Found</div>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
]

export default createBrowserRouter(routes)
